<?php

namespace App\Http\Controllers;

use App\Experience;
use App\Kiosk;
use App\Kioskqrcode;
use App\PaymentHistory;
use App\Staff;
use App\Career;
use App\Employment;
use App\Tio;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class StaffController extends Controller
{
    public function checkModel($model)
    {
        return count($model) > 0 ? true : false ;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {

        $businessId = session ("businessId");
        $img = [ 0 => null];

        $validator = Validator::make($request->all (), [
            'firstName' => 'bail|required|min:3|max:100',
            'lastName' => 'bail|required|min:3|max:100',
            'gender' => 'bail|required|min:3|max:100',
            'martialStatus' => 'bail|required|min:3|max:100',
            'birthday' => 'bail|required|min:3|max:100',
            'address' => 'bail|required|min:3|max:100',
            'telephone' => 'bail|required|min:3|max:100',
            'email' => 'bail|required|min:3|max:100|unique:staff,Email',
            'password' => 'bail|required|min:3|max:100',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return response ()->json (['status' => false , 'errors' => $errors->all()]);
        }

        if ($request->hasFile('img0')) {
            $image = $request->file('img0');
            $name = time(). rand(1, 100).'.'.$image->getClientOriginalExtension();
            $destinationPath = public_path('/images');
            $image->move($destinationPath, $name);
            $img[0] = '/public/images/'.$name ;
        }

        $staffWorkingPlan = json_decode($request->workingPlan, true) ;
        $calculatedTime = 0 ;

        $days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

            foreach ($days as $day)
            {
                if( isset($staffWorkingPlan[$day]) && count($staffWorkingPlan[$day]))
                {
                    foreach ($staffWorkingPlan[$day] as $result)
                    {
                        $startTime = Carbon::parse($result['start']);
                        $finishTime = Carbon::parse($result['end']);

                        $totalDuration = $finishTime->diffInSeconds($startTime);
                        $calculatedTime += $totalDuration ;
                    }
                }
            }

            $factorValue = ['hour', 'week', 'month'];
            $factor = array_key_exists($request->factor, $factorValue) ? $request->factor : 'hour';
            $salary = 0 ;

            switch ($factor)
            {
                case 'hour':
                    $pay = $request->pay / $request->periode ;
                    $salary = round($pay, 2);
                    break;
                case 'week' :
                    $pay = round(($calculatedTime / 3300), 2) * $request->periode ;
                    $pay = $request->pay / $pay ;
                    $salary = round($pay, 2);
                    break;
                case 'month':
                    $calculatedTime = $calculatedTime * 4 ;
                    $pay = round(($calculatedTime / 3300), 2) * $request->periode ;
                    $pay = $request->pay / $pay ;
                    $salary = round($pay, 2);
                    break;
            }


        $career = Career::create([
          'BeginTime' => time(),
          'WorkClass' => 1,//TODO: bu kisim frontend e working plan kismi hazir olduktan sonra eklenecek simdilik varsayilan 1,
          'Staff' => null,
          'Experience' => $request->experience,
          'Recompense' => 1
        ]);

        $staff = Staff::create([
          "FirstName" => $request->firstName,
          "LastName" => $request->lastName,
          "Birthday" => $request->birthday,
          'Password' => bcrypt($request->password),
          "Image" => $img[0],
          "Adress" => $request->address,
          "Telephone" => $request->telephone,
          "Gsm" => $request->telephone,
          "Email" => $request->email,
          "Gender" => $request->gender,
          "MartialStatus" => $request->martialStatus,
          "Business" => $businessId,
          "Employment" => 1,
          "Career" => $career->Id,
          "TimeSheetMap" => 1,
           'workingPlan' => $staffWorkingPlan,
           'Experience' => $request->experience,
            'Factor' => $request->factor,
            'Pay' => $request->pay,
            'Periode' => $request->periode,
            'operationtime' => $calculatedTime,
            'salary' => $salary
        ]);

        $employment = Employment::create([
          'Manager' => $businessId,
          'Business' => $businessId,
          'OperationTime' => time(),
          'Status' => 'Recruitment',
          'Staff' => $staff->Id,
        ]);

        $career->update([
          'Staff' => $staff->Id,
        ]);

        return response ()->json([
            'status' => true,
            'text' => 'kayit basarili'
        ]);

    }

    public function staffHomePage()
    {
        return view('staff.home');
    }

    public function staffLoginPage($code)
    {
        $kiosk = Kioskqrcode::where('code', $code)->get();

        if($this->checkModel($kiosk) )
        {
            $kioskIp= $kiosk[0]->ip;
            $updatedKiosk = Kioskqrcode::where('id', $kiosk[0]->id)->update([
                'active' => 0
            ]);

            session()->put('registerTime', time());
            session()->put('kioskIp', $kiosk[0]->ip);


            return view('staff.login');

        }else {
            //gecersiz code ise uyari sayfasi goster
            return view('404');
        }
    }

    public function  staticStaffLoginPage()
    {
        session()->put('staffLogin', true); //logini kiosk loginden ayirmak icin
        return view('staff.login');
    }

    public function staffLogin(Request $request)
    {
        $request->username = isset($request->username) ? trim($request->username) : '';
        $request->password = isset($request->password) ? trim($request->password) : '' ;

        if(!session()->has('staffLogin'))
        {
            if( !session()->has('registerTime') )
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
        }

        $validator = Validator::make($request->all(), [
            'username' => 'required|email',
            'password' => 'required|min:3|max:100'
        ]);

        if ($validator->fails())
        {
            $errors = $validator->errors();
            return response ()->json ($errors->all());
        }

        $staff = Staff::where('Email', $request->username)->get();

        if(!$this->checkModel($staff))
        {
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

        if(session()->has('staffLogin'))
        {

            session()->put('staff', $staff[0]->Id);
            return response()->json([
                'status' => true,
                'text' => ':)',
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
                    'Business' => $staff[0]->Business
                ]);
            }else{
                //staff daha once giris cikis islemi yapmissa
                $newTio = Tio::create([
                    'Staff' => $staff[0]->Id,
                    'KioskIp' => session()->get('kioskIp'),
                    'Traffic' => $tio[0]->Traffic == 'Enter' ? 'Leave' : 'Enter',
                    'Business' => $staff[0]->Business
                ]);

                //user cikis islemi yaptiginda hesaplamaya dahil edilecek fiyati
                if($tio[0]->Traffic == 'Enter')
                {
                    $difference =  time() - $tio[0]->created_at->timestamp;
                    $multiplier = $staff[0]->salary * ($difference / 3300);

                    Tio::where('Id', $tio[0]->Id)->update(['Active' => 0]);
                    Tio::where('Id', $newTio->Id)->update(['Active' => 0]);

                    $oldBalance = $staff[0]->Balance ;
                    $newBalance = round(($oldBalance + $multiplier ), 2) ;
                    Staff::where('Id', $staff[0]->Id)->update(['Balance' => $newBalance]);
                }
            }

            session()->put('staff', $staff[0]->Id);
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

    public function staffMe()
    {
        if(!session()->has('staff'))
        {
            return response()->json([
                'status' => false ,
                'text' => 'before login please'
            ]);
        }

        $staff = Staff::where('Id', session('staff'))->get();

        $logHistory= Tio::where('Staff',session('staff'))->orderBy('created_at', 'desc')->limit(10)->get();
        $logCount= Tio::where('Staff', session('staff'))->orderBy('created_at', 'desc')->count();

        $paymentHistory = PaymentHistory::where('active', 1)->where('staff',session('staff'))->orderBy('created_at', 'desc')->limit(10)->get();
        $paymentHistoryTotalCalculatedPrice = PaymentHistory::where('staff',session('staff'))->sum('pay');

        $result = $staff->map(function($user) use ($paymentHistory, $paymentHistoryTotalCalculatedPrice, $logCount, $logHistory) {
            $data = (object)[];
            $data->status = true ;
            $data->user = (object)[];
            $data->user->img = $user->Image ;
            $data->user->username = $user->FirstName.' '. $user->LastName ;
            $experience = Experience::where('Id', $user->Experience)->get();
            $data->user->experience = $experience[0]->Identifier;
            $data->user->email = $user->Email;
            $data->user->factor = $user->Factor ;
            $data->user->adress = $user->Adress ;
            $data->user->phone = $user->Telephone ;
            $data->user->Gender = $user->Gender ;
            $data->user->martialStatus = $user->MartialStatus ;
            $data->user->workingPlan = $user->workingPlan ;
            $data->logHistory = (object)[];

            $data->logHistory->balance = $user->Balance ;
            $data->logHistory->type = 'log';
            $data->logHistory->logHistory = $logHistory->map(function($data){
                $result = (object)[];
                $result->time = $data->Hour;
                $result->traffic = $data->Traffic;
                return $result ;
            });
            $data->logHistory->logCount = $logCount ;
            $data->logHistory->total = $paymentHistoryTotalCalculatedPrice ;
            $data->logHistory->paymentHistory = $paymentHistory->map(function($data){
                $result = (object)[];
                $result->pay = $data->pay ;
                return $result;
            }) ;
            return $data ;
        });

        return response()->json($result);
    }

    public function staffLogout()
    {
        if(!session()->has('staff'))
        {
            return response()->json([
                'status' => false ,
                'text' => 'before login please'
            ]);
        }

        return response()->json([
            'status' => true
        ]);
    }
}
