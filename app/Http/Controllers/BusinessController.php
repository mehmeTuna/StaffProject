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

    public function update(BusinessProfileUpdateRequest $request)
    {
        $type = ['password', 'email', 'address', 'webPage', 'phone', 'img'];
        $resultData = [];
        $business = Business::find(session('businessId'));

        if(isset($request['name'])){
            $business->businessName= $request['name'];
            $business->save();
            $resultData['name'] = $request['name'];
            return response()->json([
                'status' => true,
                'data' => $resultData
            ]);
        }
        if(isset($request['address'])){
            $business->address= $request['address'];
            $business->save();
            $resultData['address'] = $request['address'];
            return response()->json([
                'status' => true,
                'data' => $resultData
            ]);
        }
        if(isset($request['email'])){
            $business->email= $request['email'];
            $business->save();
            $resultData['email'] = $request['email'];
            return response()->json([
                'status' => true,
                'data' => $resultData
            ]);
        }
        if(isset($request['webpage'])){
            $business->webPage= $request['webpage'];
            $business->save();
            $resultData['webpage'] = $request['webpage'];
            return response()->json([
                'status' => true,
                'data' => $resultData
            ]);
        }
        if(isset($request['phone'])){
            $business->phone= $request['phone'];
            $business->save();
            $resultData['phone'] = $request['phone'];
            return response()->json([
                'status' => true,
                'data' => $resultData
            ]);
        }

        if($request->hasFile('img')) {
            $image = $request->file('img');
            $fileName = time() . rand(1, 100) . '.' . $image->getClientOriginalExtension();
            $destinationPath = public_path();
            $img = Image::make($image->getRealPath());
            $img->resize(300, 300, function ($constraint) {
                $constraint->aspectRatio();
            })->save($destinationPath . '/images/'.$fileName);

            $business->image = '/public/images/' . $fileName;
            $resultData['profileImg'] = '/public/images/' . $fileName;
            return response()->json([
                'status' => true,
                'data' => $resultData
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

        dispatch(new \App\Jobs\BusinessEntranceExitJob($business->id, 'login'));
        session()->put('businessId', $business->id);

        return $this->respondSuccess(['url' => "/{$business->username}/"]);
    }

    public function logout()
    {
        dispatch(new \App\Jobs\BusinessEntranceExitJob($this->businessId, 'logout'));
        session()->flush();
        return redirect('/login');
    }

    public function register(StoreBusinessRegister $request)
    {
        //TODO bu kisimda ip adresine gore adresini ogrenme kismini job olarak tanimla register kismini bloklamasin
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
        dispatch(new \App\Jobs\BusinessEntranceExitJob($business->id, 'login'));

        return $this->respondSuccess([
            'businessSlugName' => $business->username
        ]);
    }

    public function home($businessUsername)
    {
        $business = Business::with(['planDetail'])
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
        $business = Business::active()->with('planDetail')->findOrFail($this->businessId);

        return $this->respondSuccess($business);
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
