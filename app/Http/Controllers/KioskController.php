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
            'name' => 'denem amacli yazildi'
        ]);
    }

    public function me(Request $request)
    {
        //ilk adim kiosk a ait verileri getir
        //qr icn diger bos fonksiyonu kullan

        $kioskIpAddress = $request->ip();

        $kiosk = Kiosk::where('RemoteAddress', $kioskIpAddress)->get();

        //$business = Kiosk::where('RemoteAddress', $kioskIpAddress)->business;`
        $business = Business::find($kiosk[0]['Business']);

        return response()->json([
            'status' => true,
            'isLogin' => false,
            'data' => [
                'businessName' => $business->BusinessName,
            ]
        ]);
    }

    public function controllerQr(Request $request)
    {
        $randString = '';
        $ip = $request->ip();
        $rand = Str::random(20) ;

           $randString = 'http://'.$request->getHost().'/kiosk/staff/'.$rand;
           Kioskqrcode::create([
               'code' => $rand,
               'ip' => $ip,
               'time' => time() + 60
           ]);

        $pngImage = QrCode::format('png')->size(300)->errorCorrection('H')
        ->generate($randString);

        return response($pngImage)->header('Content-type','image/png');
    }

    public function login(Request $request)
    {
        $kioskIpAddress = $request->ip();
        $KioskCode = $request->code;

        $kiosk = Kiosk::where('RemoteAddress', $kioskIpAddress)->get();

        /*
        if (!Hash::check($KioskCode, $kiosk[0]->Code))
        {
            return response()->json([
                'status' => false,
                'text' => 'Code Hatali',
            ]);
        }
        */

        return response()->json([
            'status' => true,
            'isLogin' => true,
            'data' => [
                'businessName' => 'Mehmet Tuna',
            ]
        ]);
    }

    public function logout()
    {

    }

    public function AddNewKiosk(Request $request)
    {
        $code = $request->code;
        $name = $request->name;
        $result= (object)[];
        $result->status = false ;
        $result->data = (object)[];

        if(Cache::has($code))
        {
         $ip = Cache::get($code);

         $kiosk = Kiosk::create([
             'Identifier' => $name,
             'RemoteAddress' => $ip,
             'Business' => session('businessId'),
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

        $kiosk = Kiosk::where('RemoteAddress', $request->ip())->where('active', 1)->get();
        $kioskCheck = $this->checkModel($kiosk);

        if($kioskCheck)
        {
            $business = Business::where('id', $kiosk[0]->Business)->get();
            return view('kiosk.home',[
                'name' => $business[0]->name
            ]);
        }

        $ip = $request->ip();
        $code = str_random(6);
        $time = Carbon::now()->addMinutes(10) ;
        Cache::put($code, $ip, $time);

        return view('kioskRegister', [
            'code' => $code
        ]);
    }
}
