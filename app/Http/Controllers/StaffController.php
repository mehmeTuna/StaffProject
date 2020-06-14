<?php

namespace App\Http\Controllers;

use App\Business;
use App\Experience;
use App\Http\Requests\BusinessStaffRelationship;
use App\Http\Requests\StaffCreateRequest;
use App\Http\Requests\StaffDeleteRequest;
use App\Http\Requests\StaffMeRequest;
use App\Http\Requests\StaffPayment;
use App\Http\Requests\StoreStaffLogin;
use App\Kiosk;
use App\Kioskqrcode;
use App\PaymentHistory;
use App\Staff;
use App\Tio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cache;

class StaffController extends Controller
{
    protected  $businessId = null;

    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->businessId = session('businessId', null);
            return $next($request);
        });
    }

    public function payment(StaffPayment $request)
    {
        $user = $request->userId;
        $pay = (int) $request->pay;
        $comment = $request->comment ;

        $staff = Staff::where('id', $user)->first();

        if($staff == null)
            return $this->respondFail([]);

        $staff->balance = ($pay > $staff->balance) ? 0 : $staff->balance - $pay;

        if ($staff->balance != 0 && $pay != 0) {
            $staff->totalPayment = $staff->totalPayment + $pay ;
            $paymentHistory = PaymentHistory::create([
                'type' => 'payment',
                'staff' => $user,
                'pay' => $pay, //TODO: odeme ekleme kismi hatali (odenen tutar bakiyeden fazla bakiye kadarini ekleycek tutari degil)
                'comment' => $comment
            ]);
        }
        $staff->save();

        return $this->respondSuccess(['text' => 'successful']);
    }

    public function register(StaffCreateRequest $request)
    {
        $image = $request->file('img');
        $name = time() . rand(1, 100) . '.' . $image->getClientOriginalExtension();
        $destinationPath = public_path('/images');
        $image->move($destinationPath, $name);
        $img = '/public/images/' . $name;

        $staff = Staff::create([
            "firstName" => $request->firstName,
            "lastName" => $request->lastName,
            "birthday" => $request->birthday,
            'password' => bcrypt($request->password),
            "image" => $img,
            "address" => $request->address,
            "telephone" => $request->telephone,
            "gsm" => $request->telephone,
            "email" => $request->email,
            "gender" => $request->gender,
            "martialStatus" => $request->martialStatus,
            "business" => $this->businessId,
            'workingPlan' => $request->workingPlan,
            'experience' => $request->experience,
            'factor' => $request->factor,
            'pay' => $request->pay,
            'periode' => $request->periode,
            'salary' => 0,
        ]);

        return $this->respondSuccess();
    }

    public function delete(StaffDeleteRequest $req)
    {
        $response = Staff::find($req->id)->update([
            'active' => 0
        ]);
        return $this->respondSuccess();
    }

    public function paymentHistory(BusinessStaffRelationship $request)
    {
        $staff = Staff::find('id', $request->userId)->with(['businessOwner', 'paymentHistory']);

        $data = [];
        foreach ($staff->paymentHistory as $value){
            $response = (object)[];
            $response->amount = $value->pay .' '. $value->businessOwner->data->currencySymbolUtf8;
            $response->comment = $value->comment ;
            $response->date = $value->created_at->toDateString();
            $data[] = $response ;
        }

        return $this->respondSuccess($data);
    }

    public function logHistory(Request $request)
    {
        $staffId = (int)$request->userId;
        $staff = Staff::where('id', $staffId)->first();

        $data = $staff->logHistory()->get();

        if($data == null)
            return $this->respondSuccess([]);

        $response = $data->map(function($data){
            $response = (object)[];
            $response->type = $data->traffic ;
            $response->comment = $data->comment ;
            $response->date = $data->created_at->toDateString();
            return $response;
        });

        return $this->respondSuccess($response);
    }

    public function staffList()
    {
        $factorText = [
        'hour' => 'hourly',
        'week' => 'weekly',
        'month' => 'monthly',
        ];

        $business = Business::where('id', $this->businessId)->active()->first() ;
        $staff = $business->staff()->get() ;

        if($staff == null)
            return $this->respondSuccess([]);

        $staff = $staff->map(function ($user) use ($business, $factorText) {
            $data = $user;
            $data->currencySymbol = $business->currencySymbolUtf8;
            $data->online = $user->online;
            $experience = Experience::where('id', $data->experience)->first();
            $data->experience = $experience->identifier;
            $data->factor = $data->periode > 1 ? $data->periode . ' ' : ' ' . (isset($factorText[$data->factor]) ? $factorText[$data->factor] : 'hourly') . ' ' . $data->pay;
            return $data;
        });

        return $this->respondSuccess($staff);
    }


    public function staffLoginPage(Request $request)
    {
        if (!Cache::has($request->code)){
            return redirect('/');
        }
        $kioskQrCode = Cache::get($request->code);

        $staff = Staff::where('loginToken', $request->cookie($this->staffCookieName))->first();

        if($staff == null)
        {
            $request->session()->put('kioskIp', $kioskQrCode);
            return redirect('staff/login');
        }

        $kiosk = Kiosk::where('remoteAddress', $kioskQrCode)->first();
        if($kiosk == null){
            return redirect('/');
        }

        $this->kioskQrRegenerate($kiosk);

        $tio = Tio::where('staff', $staff->id)->orderBy('created_at', 'desc')->first();

        $newTio = Tio::create([
            'staff' => $staff->id,
            'kioskId' => $kioskQrCode,
            'traffic' => $staff->online ? 'Leave' : 'Enter',
            'business' => $staff->business,
        ]);

        if($staff->online){
            $difference = time() - $tio->created_at->timestamp;
            $multiplier = $staff->salary * ($difference / 3300);
            $oldBalance = $staff->balance;
            $newBalance = round(($oldBalance + $multiplier), 2);
            $staff->balance = $newBalance ;
        }
        $token = str_random(60);
        $staff->online = !$staff->online ;
        $staff->loginToken = $token ;
        $staff->save();

        session()->put('staff', $staff->id);

        return redirect('/staff/home')->cookie($this->staffCookieName, $token, $this->oneYearCookieTime());
    }

    public function staffLogin(StoreStaffLogin $request)
    {
        $staff = Staff::where('email', $request->username)->firstOrFail();

        if (!Hash::check($request->password, $staff->password)) {
            return response()->json([
                'status' => false,
                'text' => 'Username and password incorrect',
            ]);
        }

        session()->put('staff', $staff->id);

        if(session()->has('kioskIp')){
            $tio = Tio::where('staff', $staff->id)->orderBy('created_at', 'desc')->first();

            $newTio = Tio::create([
                'staff' => $staff->id,
                'kioskId' => session('kioskIp'),
                'traffic' => $staff->online ? 'Leave' : 'Enter',
                'business' => $staff->business,
            ]);

            if($staff->online){
                $difference = time() - $tio->created_at->timestamp;
                $multiplier = $staff->salary * ($difference / 3300);

                $oldBalance = $staff->balance;
                $newBalance = round(($oldBalance + $multiplier), 2);

                $staff->balance = $newBalance ;
            }
            $staff->online = !$staff->online;
            session()->forget('kioskIp');
        }

        $token =str_random(60);
        $staff->loginToken = $token;
        $staff->save();

        return response()->json([
            'status' => true,
            'text' => 'Basarili  giris',
        ])->cookie($this->staffCookieName, $token, $this->oneYearCookieTime());
    }

    public function me(StaffMeRequest $request)
    {
        $data = (object)[];
        $staff = Staff::where('id', session('staff'))->first();

        if($staff == null)
            return $this->respondFail([]);

        $logHistory = Tio::where('staff', session('staff'))->orderBy('created_at', 'desc')->limit(10)->get();
        $logCount = Tio::where('staff', session('staff'))->count();

        $paymentHistory = PaymentHistory::where('active', 1)->where('staff', session('staff'))->orderBy('created_at', 'desc')->limit(10)->get();
        $paymentHistoryTotalCalculatedPrice = PaymentHistory::where('staff', session('staff'))->sum('pay');

            $data->img = $staff->image;
            $data->username = $staff->firstName . ' ' . $staff->lastName;
            $experience = Experience::where('id', $staff->experience)->first();
            $data->experience = $experience->identifier;
            $data->email = $staff->email;
            $data->factor = $staff->factor;
            $data->adress = $staff->address;
            $data->phone = $staff->telephone;
            $data->gender = $staff->gender;
            $data->martialStatus = $staff->martialStatus;
            $data->workingPlan = $staff->workingPlan;
            $data->logHistory = (object) [];

            $data->logHistory->balance = $staff->balance;
            $data->logHistory->type = 'log';
            $data->logHistory->logHistory = $logHistory->map(function ($data) {
                $result = (object) [];
                $result->time = $data->created_at->toDateTimeString();
                $result->traffic = $data->traffic;
                return $result;
            });
            $data->logHistory->logCount = $logCount;
            $data->logHistory->total = $paymentHistoryTotalCalculatedPrice;
            $data->logHistory->paymentHistory = $paymentHistory->map(function ($data) {
                $result = (object) [];
                $result->pay = $data->pay;
                return $result;
            });

        return response()->json($data);
    }

    public function staffLogout(Request $request)
    {
        if (!session()->has('staff')) {
            return response()->json([
                'status' => false,
                'text' => 'before login please',
            ]);
        }

        $staff = Staff::where('loginToken', $request->cookie($this->staffCookieName))->first();

        if($staff != null)
        {
            $staff->update([
                'loginToken' => ''
            ]);
        }

        $cookie = \Cookie::forget($this->staffCookieName);

        return response()->json([
            'status' => true,
        ])->withCookie($cookie);
    }

    public function index()
    {
        return $this->respondSuccess([
            'name' => 'demo',
        ]);
    }
}