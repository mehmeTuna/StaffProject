<?php

namespace App\Http\Controllers;

use App\Business;
use App\Kioskqrcode;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use QrCode;
use App\Kiosk;
use App\Http\Requests\BusinessKioskRelation;

class KioskController extends Controller
{
    public function home()
    {
        return view('kiosk.home', [
            'name' => 'Version'
        ]);
    }

    public function me(Request $request)
    {
        $id = $request['webKiosk'];

        $kiosk = Kiosk::where('remoteAddress', $id)
            ->with('getBusiness')
            ->where('active', 1)
            ->first();

        if($kiosk == null){
            $kioskId = str_random(40);
            $code = str_random(8);
            Cache::put($code, $kioskId, Carbon::now()->addMinutes(10));
            return $this->respondFail(['isLogin' => false, 'code' => $code, 'kioskId' => $kioskId]);
        }

        $code = str_random(20);
        Cache::put($code, $kiosk->remoteAddress, Carbon::now()->addMinutes(5));

        return $this->respondSuccess([
            'isLogin' => true,
            'kioskId' => $kiosk->remoteAddress,
            'business' => $kiosk->getBusiness,
            'qrCode' => env('APP_URL').'/kiosk/staff/'.$code,
        ]);
    }


    public function AddNewKiosk(BusinessKioskRelation $request)
    {
        $code = $request->code;
        $name = $request->name;
        
        if(!Cache::has($code))
            return $this->respondFail(['text' => 'Undefined Code']);

        $kioskCode = Cache::get($code); 

        $kiosk = Kiosk::create([
            'identifier' => $name,
            'remoteAddress' => $kioskCode,
            'business' => session('businessId'),
        ]);

       $this->kioskQrRegenerate($kiosk);

        return $this->respondSuccess(['text' => 'Kiosk Created']);
    }
}