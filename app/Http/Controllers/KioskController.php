<?php

namespace App\Http\Controllers;

use App\Kioskqrcode;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use QrCode;
use App\Kiosk;
use App\Business;
use App\Http\Requests\BusinessKioskRelation;

class KioskController extends Controller
{

    public function checkModel($model)
    {
        return count($model) > 0 ? true : false ;
    }

    public function dataResponse($data){
        return response()->json([
            'status' => $data->status,
            'data' => $data->data
        ]);
    }

    public function home()
    {
        return view('kiosk.home', [
            'name' => 'Version'
        ]);
    }

    public function me(Request $request)
    {
        $kiosk = Kiosk::where('remoteAddress', $request->cookie($this->kioskCookieName))
            ->where('active', 1)
            ->first();

        if($kiosk == null)
             return response('not found');

        $business = Business::find($kiosk->business);

        return response()->json([
            'status' => true,
            'isLogin' => false,
            'data' => [
                'businessName' => $business->businessName,
            ]
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

           $randString = 'http://'.$request->getHost().'/kiosk/staff/'.$rand;
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
        $result= (object)[];
        $result->status = false ; 
        $result->data = (object)[];

        if(Cache::has($code))
        {
         $kioskCode = Cache::get($code);

         $kiosk = Kiosk::create([
             'identifier' => $name,
             'remoteAddress' => $kioskCode,
             'business' => session('businessId'), 
         ]);

         $result->status = true ;
         $result->data->text = 'Kiosk created';
        }else {
            $result->data->text = 'Undefined code';
        }

        return $this->dataResponse($result);
    }

    public function kioskRegisterPage(Request $request)
    {
       $kiosk = Kiosk::where('remoteAddress', $request->cookie($this->kioskCookieName))
           ->active()
           ->first();

        if($kiosk != null)
        {
            return view('kiosk.home',[
                'name' => $kiosk->getBusiness->businessName
            ]);
        }

        $rand = str_random(40);
        $code = str_random(6);
        $time = Carbon::now()->addMinutes(10) ;
        Cache::put($code, $rand, $time);

        return response()->view('kioskRegister', [
            'code' => $code
        ])->cookie(
            $this->kioskCookieName, $rand, $this->oneYearCookieTime()
        );
    }
}