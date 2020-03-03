<?php

namespace App\Http\Controllers;

use App\Business;
use App\Kiosk;
use App\Kioskqrcode;
use App\PaymentHistory;
use App\Staff;
use App\Experience;
use App\Tio;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
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

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|email',
            'password' => 'required|min:3|max:100'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'text' => 'Gecerli bir email ve parola giriniz'
            ]);
        }

        $business = Business::where('Email', $request->username)->get();

        if (!isset($business[0])) {
            return response()->json([
                'status' => false,
                'text' => 'Kullanici adi ve parola hatali'
            ]);
        }

        if (!Hash::check($request->password, $business[0]->Password)) {
            return response()->json([
                'status' => false,
                'text' => 'Parola Hatali',
                'url' => '/business/giris',
            ]);
        }

        session()->put('businessId', $business[0]->Id);

        return response()->json([
            'status' => true,
            'text' => 'is login',
            'url' => '/' . $business[0]->Username . '/',
        ]);
    }

    public function logout()
    {
        if (session()->has('businessId')) {
            session()->forget('businessId');
            return response()->json([
                'status' => true,
                'text' => 'is logut'
            ]);
        }

        return response()->json([
            'status' => false
        ]);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "businessName" => "required|min:3|max:255",
            "telephone" => "required|max:40",
            'email' => 'email|required|unique:business,Email',
            "password" => "required|max:100",
        ]);

        if ($validator->fails()) {
            return redirect('/');
        }

        $business = Business::create([
            "Email" => $request["email"],
            "Username" => str_slug($request["businessName"]),
            "BusinessName" => $request["businessName"],
            "Phone" => $request["telephone"],
            "Password" => Hash::make($request["password"]),
            "Country" => "TR_tr",
            "Lang" => "TR_tr",
        ]);

        session()->put("businessId", $business->Id);
        return redirect("/{$business->Username}/");
    }

    public function home()
    {
        if (!session()->has("businessId"))
            return view('business.register');

        return view("business.Home");
    }

    public function businessData()
    {
        if (!session()->has("businessId"))
            return view('business.register');

        $id = session()->get("businessId");
        $business = Business::where("id", $id)->get();

        $staffCount = Staff::where("Business", $id)->count();
        $experienceCount = Experience::where("Business", $id)->count();


        return response()->json([
            "email" => $business[0]->Email,
            "username" => $business[0]->Username,
            "img" => $business[0]->Image,
            "name" => $business[0]->BusinessName,
            "staff" => $staffCount,
            "experience" => $experienceCount
        ]);
    }

    public function homeData()
    {
        $businessId = session('businessId');
        $result = (object)[];

        if(Cache::has('homeData')){
            return response()->json(array(
                'status' => true,
                'data' => Cache::get('homeData')
            ));
        }

        $tio = Tio::where('Business', $businessId)->where('Traffic', 'Enter')->limit(5)->orderBy('created_at', 'desc')->get();

        $result->onlineStaff = $tio->map(function ($data) {
            $result = (object)[];
            $staff = Staff::where('Id', $data->Staff)->get();
            $result->name = $staff[0]->FirstName . ' ' . $staff[0]->LastName;
            $result->time = $data->created_at ;
            return $result;
        });

        $kiosk = Kioskqrcode::where('active', 1)->where('time', time() - 900)->get();

        $result->onlineKiosk = $kiosk->map(function ($data) {
            $result = (object)[];
            $kiosk = Kiosk::where('RemoteAddress', $data->ip)->get();
            $result->name = $kiosk[0]->Identifier;
            return $result;
        });

        $staff = Staff::where('Business', $businessId)->where('active', 1)->select('Id')->get();

        $paymentHistory = PaymentHistory::whereIn('staff', $staff)->get();

        $result->lastPayment = $paymentHistory->map(function ($data) {
            $result = (object)[];
            $staff = Staff::where('Id', $data->staff)->get();
            $result->name = $staff[0]->FirstName . ' ' . $staff[0]->LastName;
            $result->pay = $data->pay;
            return $result;
        });

        $tio = Tio::where('Business', $businessId)->limit(5)->orderBy('created_at', 'desc')->get();
        $result->lastLog = $tio->map(function ($data) {
            $result = (object)[];

            $staff = Staff::where('Id', $data->Staff)->get();

            $result->name = $staff[0]->FirstName . ' ' . $staff[0]->LastName;
            $result->time = $data->created_at;
            return $result;
        });

        $staff = Staff::where('Business', $businessId)->where('active', 1)->where('Balance', '>', 0)->limit(5)->orderBy('created_at', 'desc')->get();

        $result->paymentHistory = $staff->map(function ($data) {
            $result = (object)[];

            $result->name = $data->FirstName . ' ' . $data->LastName;
            $result->balance = $data->Balance;
        });

       // Cache::put('homeData', $result, Carbon::now()->addSeconds(30));

        return response()->json([
            'status' => true,
            'data' => $result
        ]);
    }
}
