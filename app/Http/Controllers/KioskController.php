<?php

namespace App\Http\Controllers;

use App\Kioskqrcode;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use QrCode;
use App\Kiosk;
use App\Http\Requests\BusinessKioskRelation;
use Illuminate\Support\Facades\Redis;
use App\Events\KioskEvent;

class KioskController extends Controller
{

    public function getRedis()
    {
      //  Redis::setex('name', 10, 'mehmet');

      $list = Redis::KEYS("*");

     
        $result = '';

        //Loop through list of keys
        foreach ($list as $key)
        {
            //Get Value of Key from Redis
            $value = Redis::get($key);
            
            //Print Key/value Pairs
            $result = $result . "<b>Key:</b> $key  =>  $value <br /><br />";
        }

        return response($result);
    }

    public function home()
    {
        return view('kiosk.home', [
            'name' => 'Version'
        ]);
    }

    public function me(Request $request)
    {
        $id = $request['id'];

        $kiosk = Kiosk::where('remoteAddress', $id)
            ->with('getBusiness')
            ->where('active', 1)
            ->first();

        if($kiosk == null){
            $kioskId = str_random(40);
            $code = str_random(6);
            Cache::put($code, $kioskId, Carbon::now()->addMinutes(10));
            return $this->respondFail(['isLogin' => false, 'code' => $code, 'kioskId' => $kioskId]);
        }

        return $this->respondSuccess([
            'kioskId' => $kiosk->remoteAddress
        ]);
    }

    public function staffHomePage()
    {
        return view('staff.home');
    }

    public function staffLoginPage($code)
    {
        $kiosk = Kioskqrcode::where('code', $code)->first();

        if($kiosk == null){
            //gecersiz code ise uyari sayfasi goster
            return view('404');
        }

        //TODO:: bunu bir class yap ordan yap isleri
        $updatedKiosk = Kioskqrcode::where('id', $kiosk->id)->update([
            'active' => 0
        ]);

        session()->put('registerTime', time());
        session()->put('kioskIp', $kiosk->remoteAddress);


        return view('staff.login');
    }
    
    public function controllerQr(Request $request)
    {
        $randString = '';
        $ip = $request->cookie($this->kioskCookieName);
        $rand = Str::random(20) ;

           $randString = env('APP_URL').'/kiosk/staff/'.$rand;
           Kioskqrcode::updateOrCreate([
               'ip' => $ip
           ], [
               'code' => $rand,
               'time' => time() + 60
           ]);

        $pngImage = QrCode::format('png')->size(300)->errorCorrection('H')
        ->generate($randString);

        return response($pngImage)->header('Content-type','image/png');
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

        broadcast(new KioskEvent($kioskCode));

        Cache::forget($code);

        return $this->respondSuccess(['text' => 'Kiosk Created']);
    }

    public function kioskRegisterPage(Request $request)
    {
        return view('kioskRegister');
    }
}