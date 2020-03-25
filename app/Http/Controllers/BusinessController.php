<?php

namespace App\Http\Controllers;

use App\Business;
use App\Http\Requests\StoreBusinessLogin;
use App\Http\Requests\StoreBusinessRegister;
use App\PaymentHistory;
use App\Staff;
use App\Tio;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class BusinessController extends Controller
{
    protected  $businessId = null;

    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->businessId = session('businessId', null);
            return $next($request);
        });
    }

    public function registerPage()
    {
        return view('business.register');
    }

    public function loginPage()
    {
        return view('business.login');
    }

    public function update(Request $request)
    {
        $type = ['name', 'password', 'email', 'address', 'webPage', 'phone', 'img'];

        if (in_array($request->type, $type)) {
            $renameData = '';
            $request->data = $request->type == 'password' ? Hash::make($request->data) : $request->data;
            switch ($request->type) {
                case 'name':
                    $renameData = 'businessName';
                    break;
                case 'password':
                    $renameData = 'password';
                    break;
                case 'email':
                    $renameData = 'email';
                    break;
                case 'address':
                    $renameData = 'address';
                    break;
                case 'webPage':
                    $renameData = 'webPage';
                    break;
                case 'phone':
                    $renameData = 'phone';
                    break;
                case 'img':
                    $renameData = 'image';
                    if ($request->hasFile('img')) {
                        $image = $request->file('img');
                        $name = time() . rand(1, 100) . '.' . $image->getClientOriginalExtension();
                        $destinationPath = public_path('/images');
                        $image->move($destinationPath, $name);
                        $request->data = '/public/images/' . $name;
                    }
                    break;
            }

            if ($renameData == '') {
                return response()->json([
                    'status' => false,
                    'text' => 'type not null',
                ]);
            }

            $business = Business::where('id', session('businessId'))->active()->update([
                $renameData => $request->data,
            ]);
            return response()->json([
                'status' => true,
            ]);
        }

        return response()->json([
            'status' => false,
            'text' => 'undefined parameter',
        ]);

    }

    public function login(StoreBusinessLogin $request)
    {
        $username = $request->username ;
        $password = $request->password ;
        $business = Business::where('email', $username)->active()->first();

        if ($business == null || !Hash::check($password, $business->password)) {
            return $this->incorrectPassword();
        }
        session()->put('businessId', $business->id);

        return $this->respondSuccess(['url' => "/{$business->username}/"]);
    }

    public function logout()
    {
        session()->forget('businessId');
        return $this->respondSuccess();
    }

    public function register(StoreBusinessRegister $request)
    {
        $email = $request->email;
        $businessName= $request->businessName;
        $phone = $request->telephone ;
        $password = $request->password ;
        $country = 'TR_tr';
        $lang = 'TR_tr';
        $business= (object)[];

        try {
            $business = Business::create([
                "email" => $email,
                "businessName" => $businessName,
                "phone" => $phone,
                "password" => Hash::make($password),
                "country" => $country,
                "lang" => $lang,
            ]);
        }catch(QueryException $exception){
            $errorInfo = $exception->errorInfo;

            Log::debug($errorInfo);
        }

        session()->put("businessId", $business->id);
        return redirect("/{$business->username}/");
    }

    public function home()
    {
        return view("business.Home");
    }

    public function businessData()
    {
        $business = Business::find($this->businessId);

        $staffCount = $business->staff->count();
        $experienceCount = $business->experience->count();

        return $this->respondSuccess([
            "email" => $business->email,
            "username" => $business->username,
            "img" => $business->image,
            "name" => $business->businessName,
            "staff" => $staffCount,
            "experience" => $experienceCount,
            'businessName' => $business->businessName,
            'address' => $business->address,
            'webPage' => $business->webPage,
            'phone' => $business->phone,
        ]);
    }

    public function homeData()
    {

        $result = (object)[];

        /*
        if(Cache::has('homeData')){
        return response()->json(array(
        'status' => true,
        'data' => Cache::get('homeData')
        ));
        }
         */

        $business = Business::find($this->businessId)->first();

        $tio = $business->tio()->orderBy('created_at', 'desc')->groupBy('staff')->get();

        //total
        $result->staffCount = $business->staff->count();
        $result->kioskCount = $business->experience->count();
        $tio = Tio::where('business', $this->businessId)->where('traffic', 'Enter')->limit(5)->orderBy('created_at', 'desc')->get();

        $result->onlineStaff = [];

        $result->onlineKiosk = [];

        $staff = $business->staff;

        $staff = $staff->map(function ($val) {
            return $val->id;
        });

        $paymentHistory = PaymentHistory::whereIn('staff', $staff)->get();

        $result->lastPayment = $paymentHistory->map(function ($data) {
            $result = (object) [];
            $staff = Staff::where('id', $data->staff)->get();
            $result->name = $staff[0]->firstName . ' ' . $staff[0]->lastName;
            $result->pay = $data->pay;
            return $result;
        });

        $tio = Tio::where('business', $this->businessId)->limit(5)->orderBy('created_at', 'desc')->get();
        $result->lastLog = $tio->map(function ($data) {
            $result = (object) [];

            $staff = Staff::where('id', $data->staff)->get();

            $result->name = $staff[0]->firstName . ' ' . $staff[0]->lastName;
            $result->time = $data->created_at->toDateTimeString();
            return $result;
        });

        $staff = Staff::where('business', $this->businessId)->where('active', 1)->where('balance', '>', 0)->limit(5)->orderBy('created_at', 'desc')->get();

        $result->paymentHistory = $staff->map(function ($data) {
            $result = (object) [];

            $result->name = $data->firstName . ' ' . $data->LastName;
            $result->balance = $data->balance;
            return $result;
        });

        // Cache::put('homeData', $result, Carbon::now()->addSeconds(30));

        return response()->json($result);
    }
}
