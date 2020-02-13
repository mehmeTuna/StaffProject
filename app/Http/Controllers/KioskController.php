<?php

namespace App\Http\Controllers;

use App\Kioskqrcode;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use QrCode;
use App\Kiosk;
use App\Business;
use App\Staff;
use App\Tio ;
use App\StaffProgressPayment;

class KioskController extends Controller
{
    public function home()
    {
        return view('kiosk.home', [
            'name' => 'denem amacli yazildi'
        ]);
    }

    public function me(Request $request)
    {
        //ilk adim kiosk a ait verileri getir
        //qr icn diger bor fonksiyonu kullan

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

        $pngImage = QrCode::format('png')->size(500)->errorCorrection('H')
        ->generate($randString);

        return response($pngImage)->header('Content-type','image/png');
    }

    public function staffLoginPage($code)
    {
        $kiosk = Kioskqrcode::where('code', $code)->get();


        if(isset($kiosk[0]) && $kiosk[0]->time >= time())
        {
            $kioskIp= $kiosk[0]->ip;
            $updatedKiosk = Kioskqrcode::where('id', $kiosk[0]->id)->update([
                'active' => 0
            ]);

            session()->put('registerTime', time());
            session()->put('kioskIp', $kioskIp);

            return view('staff.login');

        }else {
             //gecersiz code ise uyari sayfasi goster
            return view('404');
        }
    }


    public function staffLogin(Request $request)
    {
        if( !session()->has('registerTime') || !session()->has('kioskIp'))
        {
            return response()->json([
                'status' => false,
                'text' => 'Qr ve giris cikis islemi sadece tek seferliktir',
            ]);
        }

        if( !(session()->get('registerTime') + 300 >= time()) )
        {
            return response()->json([
                'status' => false,
                'text' => 'Oturum acma suresini astiniz',
            ]);
        }

        $validator = Validator::make($request->all(), [
            'username' => 'required|email',
            'password' => 'required|min:3|max:100'
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return response ()->json ($errors->all());
        }

        $staff = Staff::where('Email', $request->username)->get();

        if(!isset($staff[0]) && !isset($staff[0]->Id)){
            return response()->json([
                'status' => false,
                'text' => 'Kullanici adi ve parola hatali'
            ]);
        }

        if (!Hash::check($request->password, $staff[0]->Password))
        {
            return response()->json([
                'status' => false,
                'text' => 'Parola Hatali',
            ]);
        }

        $kiosk = Kiosk::where('RemoteAddress', session()->get('kioskIp'))->get();

        if($staff[0]->Business == $kiosk[0]->Business)
        {

            $tio = Tio::where('Staff', $staff[0]->Id)->orderBy('created_at', 'desc')->limit(1)->get();

            if(!isset($tio[0]))
            {
                //staff daha once herhangi giris cikis islemi yapmamaissa
                $newTio = Tio::create([
                    'Staff' => $staff[0]->Id,
                    'KioskIp' => session()->get('kioskIp'),
                    'Traffic' => 'Enter',
                ]);
            }else{
                //staff daha once giris cikis islemi yapmissa
                $newTio = Tio::create([
                    'Staff' => $staff[0]->Id,
                    'KioskIp' => session()->get('kioskIp'),
                    'Traffic' => $tio[0]->Traffic == 'Enter' ? 'Leave' : 'Enter',
                ]);

                //user cikis islemi yaptiginda hesaplamaya dahil edilecek fiyati
                if($tio[0]->Traffic == 'Enter')
                {
                    $multiplier = 0;
                    $periode = $staff[0]->Periode;
                    $pay = round($staff[0]->Pay / $periode, 2);
                    $differenceDecimals = 0 ;
                    $difference =  time() - $tio[0]->created_at->timestamp;
                    $differenceMod = (int)($difference /  3600) ;

                    switch ($staff[0]->Factor)
                    {
                        case 'hour':
                            $differenceDecimals = $difference - ($differenceMod * 3600) ;
                            if($differenceDecimals > 3000)
                                $differenceMod ++ ;
                            $multiplier = round($pay * $differenceMod, 2) ;
                            break;
                        case 'week':
                            $differenceDecimals = $difference - ($differenceMod * 3600) ;
                            if($differenceDecimals > 3000)
                                $differenceMod ++ ;
                            $pay = $staff[0]->pay / ($staff[0]->operationtime % 3600) ;
                            $multiplier = round($pay * $differenceMod, 2) ;
                            break;
                        case 'month';
                            $differenceDecimals = $difference - ($differenceMod * 3600) ;
                            if($differenceDecimals > 3000)
                                $differenceMod ++ ;
                            $pay = $staff[0]->pay / ($staff[0]->operationtime % 3600) ;
                            $multiplier = round($pay * $differenceMod, 2) ;
                            break;
                    }

                    Tio::where('Id', $tio[0]->Id)->update(['Active' => 0]);
                    Tio::where('Id', $newTio->Id)->update(['Active' => 0]);

                    $oldBalance = $staff[0]->Balance ;
                    $newBalance = $oldBalance + $multiplier ;
                    Staff::where('Id', $staff[0]->Id)->update(['Balance' => $newBalance]);
                }
            }

            session()->forget('kioskIp');
            session()->forget('registerTime');

            return response()->json([
                'status' => true,
                'text' => 'Basarili  giris',
            ]);
        }

        return response()->json([
            'status' => false,
            'text' => 'Qr ve giris cikis islemi sadece tek seferliktir',
        ]);
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

    public function generateId()
    {

        $business = session('businessId'); //businessId
        $minutes = 5 ; //code gecerlilik suresi
        $code = ''; 
        $isCodeUsed= false;

        if (Cache::has($business)) {
            $code = Cache::get($business);
            $isCodeUsed = Cache::get($code);
        }else {
            $code = $business . rand(0,9).rand(0,9).rand(0,9);
            Cache::put($business, $code, $minutes);
            Cache::put($code, $isCodeUsed, $minutes);
        }

        return response()->json([
            'status' => true,
            'code' => $code,
        ]);

    }

    public function AddNewKiosk(Request $request)
    {

        $code = Cache::get(session('businessId'));
        $name = $request->name;
        $codeUsed = Cache::get($code);
        $ip = Cache::get($code.'ip');
        $kiosk = null;
        $isDefinedKioskBefore = null;
        $result = [
            'status' => $codeUsed, 
            'data' => [
                'code' => $code,
                'codeUsed' => $codeUsed,
                'ip'=>$ip
            ]
         ];

        if($code !=  null)
        {
            if($codeUsed == true)
            {
                if($ip != null)
                {
                    // $isDefinedKioskBefore = Kiosk::where('RemoteAddress', $ip)->get();
                    $kiosk = Kiosk::create([
                        'Identifier' => $name,
                        'RemoteAddress' => $ip,
                        'Business' => session('businessId'),
                    ]);
                }
            }
        }

        Cache::pull(session('businessId'));
        Cache::pull($code);
        Cache::pull($code.'ip');


        return response()->json($result);
    }

    public function kioskRegisterPage()
    {
        return view('kioskRegister');
    }

    public function kioskRegisterControl(Request $request)
    {
        $code = $request->code ;

        if(Cache::has($code))
        {
            if(!Cache::get($code))
                Cache::put($code, true, 5);

            Cache::put($code.'ip', $request->ip(), 5);
        }

        return redirect('kiosk/anasayfa');
    }
}
