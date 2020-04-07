<?php

namespace App\Http\Controllers;

use App\Business;
use App\Http\Requests\StoreBusinessLogin;
use App\Http\Requests\StoreBusinessRegister;
use App\Kioskqrcode;
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

            $business = Business::where('id', $this->businessId)->active()->update([
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
        $locationData = $this->learnGeoPlugin($request->ip());
        $business = (object) [];

        try {
            $business = Business::create([
                "email" => $email,
                "businessName" => $businessName,
                "phone" => $phone,
                "password" => Hash::make($password),
                "country" => $locationData->geoplugin_countryName,
                "lang" => $locationData->geoplugin_countryCode,
                'data' => [
                    'currencySymbol' => $locationData->geoplugin_currencySymbol,
                    'timeZone' => $locationData->geoplugin_timezone,
                    'countryCode' => $locationData->geoplugin_countryCode,
                    'country' => $locationData->geoplugin_countryName,
                    'currencyCode' => $locationData->geoplugin_currencyCode,
                    'currencySymbolUtf8' => $locationData->geoplugin_currencySymbol_UTF8,
                ],
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

        return $this->respondSuccess([
            "email" => $business->email,
            "username" => $business->username,
            "img" => $business->image,
            "name" => $business->businessName,
            "staff" => $business->staff->count(),
            "experience" => $business->experience->count(),
            'businessName' => $business->businessName,
            'address' => $business->address,
            'webPage' => $business->webPage,
            'phone' => $business->phone,
            'country' => $business->data->country,
            'currencySymbolUtf8' => $business->data->currencySymbolUtf8,
            'currencySymbol' => $business->data->currencySymbol,
        ]);
    }

    public function homeData()
    {
        $business = Business::find($this->businessId);
        $kiosk = [];

        if ($business == null) {
            return $this->respondSuccess([]);
        }

        foreach ($business->kiosk()->get() as $value) {
            $tio = Kioskqrcode::where('ip', $value->remoteAddress)->where('updated_at', '>=', Carbon::now()->addMinute(-5)->toDateTimeString())->first();
            if ($tio != null) {
                array_push($kiosk, $value);
            }

        }

        return $this->respondSuccess([
            'staff' => [
                'count' => $business->staff()->count(),
                'online' => $business->staff()->where('online', 1)->get(),
            ],
            'experience' => [
                'count' => $business->experience()->count(),
            ],
            'kiosk' => [
                'count' => $business->kiosk()->count(),
                'online' => $kiosk,
            ],
            'lastPayment' => $business->lastPayment()->get(),
            'lastLog' => $business->lastLog()->get(),
            'paymentHistory' => $business->staffWithPayment()->get(),
        ]);
    }
}