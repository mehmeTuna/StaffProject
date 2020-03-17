<?php

namespace App\Http\Controllers;

use App\Business;
use App\Experience;
use App\Http\Requests\StoreBusinessLogin;
use App\Http\Requests\StoreBusinessRegister;
use App\Kiosk;
use App\Kioskqrcode;
use App\PaymentHistory;
use App\Staff;
use App\Tio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class BusinessController extends Controller
{

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
        $business = Business::where('email', $request->username)->active()->first();

        if ($business == null) {
            return response()->json([
                'status' => false,
                'text' => 'username or password incorrect',
            ]);
        }

        if (!Hash::check($request->password, $business->password)) {
            return response()->json([
                'status' => false,
                'text' => 'username or password incorrect',
                'url' => '/business/giris',
            ]);
        }

        session()->put('businessId', $business->id);

        return response()->json([
            'status' => true,
            'text' => 'is login',
            'url' => '/' . $business->username . '/',
        ]);
    }

    public function logout()
    {
        if (session()->has('businessId')) {
            session()->forget('businessId');
            return response()->json([
                'status' => true,
                'text' => 'is logut',
            ]);
        }

        return response()->json([
            'status' => false,
        ]);
    }

    public function register(StoreBusinessRegister $request)
    {
        $business = Business::create([
            "email" => $request["email"],
            "businessName" => $request["businessName"],
            "phone" => $request["telephone"],
            "password" => Hash::make($request["password"]),
            "country" => "TR_tr",
            "lang" => "TR_tr",
        ]);

        session()->put("businessId", $business->id);
        return redirect("/{$business->username}/");
    }

    public function home()
    {
        if (!session()->has("businessId")) {
            return view('business.register');
        }

        return view("business.Home");
    }

    public function businessData()
    {

        $id = session()->get("businessId");
        $business = Business::find($id);

        $staffCount = $business->staff->count();
        $experienceCount = $business->experience->count();

        return response()->json([
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
        $result['status'] = true;

        /*
        if(Cache::has('homeData')){
        return response()->json(array(
        'status' => true,
        'data' => Cache::get('homeData')
        ));
        }
         */

        $businessId = session()->get("businessId");
        $business = Business::find($businessId);

        //total
        $result['staffCount'] = $business->staff->count();
        $result['kioskCount'] = $business->experience->count();
        $tio = Tio::where('business', $businessId)->where('traffic', 'Enter')->limit(5)->orderBy('created_at', 'desc')->get();

        $result['onlineStaff'] = [];

        $result['onlineKiosk'] = [];

        $staff = $business->staff;

        $staff = $staff->map(function ($val) {
            return $val->id;
        });

        $paymentHistory = PaymentHistory::whereIn('staff', $staff)->get();

        $result['lastPayment'] = $paymentHistory->map(function ($data) {
            $result = (object) [];
            $staff = Staff::where('id', $data->staff)->get();
            $result->name = $staff[0]->firstName . ' ' . $staff[0]->lastName;
            $result->pay = $data->pay;
            return $result;
        });

        $tio = Tio::where('business', $businessId)->limit(5)->orderBy('created_at', 'desc')->get();
        $result['lastLog'] = $tio->map(function ($data) {
            $result = (object) [];

            $staff = Staff::where('id', $data->staff)->get();

            $result->name = $staff[0]->firstName . ' ' . $staff[0]->lastName;
            $result->time = $data->created_at->toDateTimeString();
            return $result;
        });

        $staff = Staff::where('business', $businessId)->where('active', 1)->where('balance', '>', 0)->limit(5)->orderBy('created_at', 'desc')->get();

        $result['paymentHistory'] = $staff->map(function ($data) {
            $result = (object) [];

            $result->name = $data->firstName . ' ' . $data->LastName;
            $result->balance = $data->balance;
            return $result;
        });

        // Cache::put('homeData', $result, Carbon::now()->addSeconds(30));

        return response()->json($result);
    }
}
