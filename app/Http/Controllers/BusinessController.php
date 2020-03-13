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
use function foo\func;

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

        $business = Business::where('Email', $request->username)->active()->get();

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
        $business = Business::find( $id);

        $staffCount = $business->staff->count();
        $experienceCount = $business->experience->count();

        return response()->json([
            "email" => $business->Email,
            "username" => $business->Username,
            "img" => $business->Image,
            "name" => $business->BusinessName,
            "staff" => $staffCount,
            "experience" => $experienceCount
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
        $business = Business::find( $businessId);

        //total
        $result['staffCount'] = $business->staff->count();
        $result['kioskCount'] = $business->experience->count();
        $tio = Tio::where('Business', $businessId)->where('Traffic', 'Enter')->limit(5)->orderBy('created_at', 'desc')->get();

        $result['onlineStaff'] = $tio->map(function ($data) {
            $result = (object)[];
            $castTio = Tio::where('Staff', $data->Staff)->where('Traffic', 'Leave')->where('created_at', '>', $data->created_at)->get();

            if(count($castTio) > 0 )
            {
                $staff = Staff::where('Id', $data->Staff)->get();
                $result->name = $staff[0]->FirstName . ' ' . $staff[0]->LastName;
                $result->time = $data->created_at->toDateTimeString() ;
                return $result;
            }
        });

        if( isset($result['onlineStaff'][0]) && $result['onlineStaff'][0] == null){
            $result['onlineStaff'] = [];
        }


        $kiosk = Kioskqrcode::where('active', 1)->where('time', time() - 900)->get();

        $result['onlineKiosk'] = $kiosk->map(function ($data) {
            $result = (object)[];
            $kiosk = Kiosk::where('RemoteAddress', $data->ip)->get();
            $result->name = $kiosk[0]->Identifier;
            return $result;
        });

        $staff = $business->staff;

        $staff = $staff->map(function ($val){
            return $val->Id;
        });

        $paymentHistory = PaymentHistory::whereIn('staff', $staff)->get();

        $result['lastPayment'] = $paymentHistory->map(function ($data) {
            $result = (object)[];
            $staff = Staff::where('Id', $data->staff)->get();
            $result->name = $staff[0]->FirstName . ' ' . $staff[0]->LastName;
            $result->pay = $data->pay;
            return $result;
        });

        $tio = Tio::where('Business', $businessId)->limit(5)->orderBy('created_at', 'desc')->get();
        $result['lastLog'] = $tio->map(function ($data) {
            $result = (object)[];

            $staff = Staff::where('Id', $data->Staff)->get();

            $result->name = $staff[0]->FirstName . ' ' . $staff[0]->LastName;
            $result->time = $data->created_at->toDateTimeString();
            return $result;
        });

        $staff = Staff::where('Business', $businessId)->where('active', 1)->where('Balance', '>', 0)->limit(5)->orderBy('created_at', 'desc')->get();

        $result['paymentHistory'] = $staff->map(function ($data) {
            $result = (object)[];

            $result->name = $data->FirstName . ' ' . $data->LastName;
            $result->balance = $data->Balance;
            return $result;
        });

       // Cache::put('homeData', $result, Carbon::now()->addSeconds(30));

        return response()->json($result);
    }
}
