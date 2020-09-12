<?php

namespace App\Http\Controllers;

use App\Business;
use App\Events\KioskEvent;
use App\Kioskqrcode;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Cookie;
use App\Kiosk;
use App\Http\Requests\BusinessKioskRelation;

class KioskController extends Controller
{
    public function home(Request $request)
    {
        $id = $request->cookie('webKiosk');

        //TODO: getBusiness iliskisindeki gelen kolonlari select ile gorunmesi gerekenleri sec ve filtrele
        $kiosk = Kiosk::where('remoteAddress', $id)
            ->with('getBusiness')
            ->where('active', 1)
            ->first();

        if ($kiosk == null) {
            $kioskId = str_random(40);
            $code = str_random(8);
            Cache::put($code, $kioskId, Carbon::now()->addMinutes(10));
            Cookie::queue('webKiosk', $kioskId, 2628000); //five years

            return view('kioskRegister', [
                'rootData' => [
                    'isLogin' => false,
                    'code' => $code,
                    'roomId' => $kioskId
                ]
            ]);
        }

        $code = str_random(20);
        $newRemoteAddress = str_random(20);
        Cache::put($code, $kiosk->remoteAddress, Carbon::now()->addMinutes(100));
        Cookie::queue('webKiosk', $newRemoteAddress, 2628000);
        $kiosk->remoteAddress = $newRemoteAddress;

        $kiosk->save();

        return view('kioskRegister', [
            'rootData' => [
                'isLogin' => true,
                'roomId' => $kiosk->remoteAddress,
                'business' => $kiosk->getBusiness,
                'qrCode' => env('APP_URL') . '/kiosk/staff/' . $code,
            ]
        ]);
    }

    public function me(Request $request)
    {
        $id = $request['webKiosk'];

        $kiosk = Kiosk::where('remoteAddress', $id)
            ->with('getBusiness')
            ->where('active', 1)
            ->first();

        if ($kiosk == null) {
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
            'qrCode' => env('APP_URL') . '/kiosk/staff/' . $code,
        ]);
    }


    public function create(BusinessKioskRelation $request)
    {
        $code = $request->code;
        $name = $request->name;

        if (!Cache::has($code))
            return $this->respondFail(['text' => 'Undefined code. Refresh page']);

        $kioskCode = Cache::get($code);

        $kiosk = Kiosk::create([
            'identifier' => $name,
            'remoteAddress' => $kioskCode,
            'business' => session('businessId'),
        ]);

        $code = str_random(20);
        Cache::put($code, $kiosk->remoteAddress, Carbon::now()->addMinutes(5));

        broadcast(new KioskEvent([
            'kioskId' => $kiosk->remoteAddress,
            'isLogin' => true,
            'business' => $kiosk->getBusiness,
            'refreshQrCode' => env('APP_URL') . '/kiosk/staff/' . $code,
        ]));

        return $this->respondSuccess(['text' => 'Kiosk Created']);
    }
}
