<?php

namespace App\Http\Controllers;

use App\Business;
use App\Http\Requests\StoreBusinessLogin;
use App\Http\Requests\StoreBusinessRegister;
use App\Kioskqrcode;
use App\Tio;
use Carbon\Carbon;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class BusinessController extends Controller
{
    protected $businessId = null;

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
        $username = $request->username;
        $password = $request->password;
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
        $businessName = $request->businessName;
        $phone = $request->telephone;
        $password = $request->password;
        $locationData = $this->learnGeoPlugin('176.90.65.99');
        $business = (object) [];

        try {
            $business = Business::create([
                "email" => $email,
                "businessName" => $businessName,
                "phone" => $phone,
                "password" => Hash::make($password),
                "country" => $locationData->geoplugin_countryName,
                "lang" => $locationData->geoplugin_countryCode,
                'data' => json_encode([
                    'currencySymbol' => $locationData->geoplugin_currencySymbol,
                    'timeZone' => $locationData->geoplugin_timezone,
                    'countryCode' => $locationData->geoplugin_countryCode,
                    'country' => $locationData->geoplugin_countryName
                ], JSON_UNESCAPED_UNICODE),
            ]);
        } catch (QueryException $exception) {
            Log::debug($exception->errorInfo);
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
        $business = Business::find($this->businessId);
        $kiosk = [];

        if($business == null){
            return $this->respondSuccess([]);
        }

        foreach ($business->kiosk()->get() as $value)
        {
            $tio = Kioskqrcode::where('ip', $value->remoteAddress)->where('updated_at', '>=', Carbon::now()->addMinute(-5)->toDateTimeString())->first();
            if ($tio != null)
                array_push($kiosk, $value);
        }

        return $this->respondSuccess([
            'staff' => [
                'count' => $business->staff()->count(),
                'online' => $business->staff()->where('online', 1)->get()
            ],
            'experience' => [
                'count' => $business->experience()->count()
            ],
            'kiosk' =>[
                'count' => $business->kiosk()->count(),
                'online' => $kiosk
            ],
            'lastPayment' => $business->lastPayment()->get(),
            'lastLog' => $business->lastLog()->get(),
            'paymentHistory' => $business->staffWithPayment()->get()
        ]);
    }
}

//select * from `kioskqrcode` inner join `kiosk` on `kiosk`.`id` = `kioskqrcode`.`ip` where `kiosk`.`business` = 9 and `kioskqrcode`.`updated_at` >= `2020-03-29 19:02:45`
