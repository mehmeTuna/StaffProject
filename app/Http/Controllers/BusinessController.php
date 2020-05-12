<?php

namespace App\Http\Controllers;

use App\Business;
use App\Http\Requests\BusinessProfileUpdateRequest;
use App\Http\Requests\StoreBusinessLogin;
use App\Http\Requests\StoreBusinessRegister;
use App\Kioskqrcode;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Image ;

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

    public function loginPage()
    {
        return view('business.login');
    }

    public function update(BusinessProfileUpdateRequest $request)
    {
        $type = ['name', 'password', 'email', 'address', 'webPage', 'phone', 'img'];

        $business = Business::find(session('businessId'));
        if (in_array($request->type, $type)) {
            switch ($request->type) {
                case 'name':
                    $business->businessName= $request->data;
                    break;
                case 'password':
                    $business->password = Hash::make($request->data) ;
                    break;
                case 'email':
                    $business->email = $request->data;
                    break;
                case 'address':
                    $business->address = $request->data;
                    break;
                case 'webPage':
                    $business->webPage = $request->data;
                    break;
                case 'phone':
                    $business->phone = $request->data;
                    break;
                case 'img':
                    if ($request->hasFile('img')) {
                        $image = $request->file('img');
                        $fileName = time() . rand(1, 100) . '.' . $image->getClientOriginalExtension();
                        $destinationPath = public_path('images/');
                        $img = Image::make($image->getRealPath());
                        $img->resize(300, 300, function ($constraint) {
                            $constraint->aspectRatio();
                        })->save($destinationPath.$fileName);

                         $business->image = '/public/images/'.$fileName;
                    }
                    break;
            }
            $business->save();
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
        $business = Business::where('email' , $username)->active()->first();
        if($business == null)
            return $this->respondFail(['type' => 'undefiend user']);

        $nowtime = Carbon::now();
        $packageTime = Carbon::parse($business->packageTime);
        $canPackageTime =$nowtime->diffInSeconds($packageTime, false);
        $response =  ($canPackageTime > 0);
        if(!$response){
            return $this->respondFail([
                'type' => 'package'
            ]);
        }
    
        if ($business == null || !Hash::check($password, $business->password)) {
            return $this->incorrectPassword();
        }
        session()->put('businessId', $business->id);

        return $this->respondSuccess(['url' => "/{$business->username}/"]);
    }

    public function logout()
    {
        session()->flush();
        return $this->respondSuccess();
    }

    public function register(StoreBusinessRegister $request)
    {
        $locationData = $this->learnGeoPlugin($request->ip());

        $business = Business::create([
            "email" => $request->email,
            "businessName" => $request->businessName,
            "phone" => $request->telephone,
            "password" => Hash::make($request->password),
            'data' => [
                'currencySymbol' => $locationData->geoplugin_currencySymbol,
                'timeZone' => $locationData->geoplugin_timezone,
                'countryCode' => $locationData->geoplugin_countryCode,
                'country' => $locationData->geoplugin_countryName,
                'currencyCode' => $locationData->geoplugin_currencyCode,
                'currencySymbolUtf8' => $locationData->geoplugin_currencySymbol_UTF8,
            ],
        ]);

        session()->put("businessId", $business->id);
        session()->put([
            'kioskCount' =>$business->kiosk->count(),
            'experienceCount' => $business->experience->count(),
            'staffCount' => $business->staff->count(),
            'packageTime' => $business->packageTime
        ]);

        return $this->respondSuccess([
            'businessSlugName' => $business->username
        ]);
    }

    public function home($businessUsername)
    {
        $business = Business::with(['planDetail', 'staff', 'experience', 'lastPayment', 'lastLog', 'staffWithPayment', 'kiosk.logHistory', 'kiosk.qrCode.online'])
            ->where('username', $businessUsername)
            ->where('id', $this->businessId)
            ->active()
            ->first();

        if ($business == null) {
            return redirect('/');
        }

        return view("business.Home", [
            'business' => $business
        ]);
    }

    public function businessData()
    {
        $business = Business::find($this->businessId);

        if($business == null){
            return $this->respondFail();
        }

        //TODO:: bu kisim obje olarak don ve frontend kisminda gerekli yerleri duzelt
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
            'country' => is_object($business->data) ? $business->data->country : '',
            'currencySymbolUtf8' => is_object($business->data) ? $business->data->currencySymbolUtf8 : '',
            'currencySymbol' => is_object($business->data) ? $business->data->currencySymbol : '',
        ]);
    }

    public function homeData()
    {
        //TODO:: bu kisima bak kulanilan yeri duzelt frontend kisminda da duzelt
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