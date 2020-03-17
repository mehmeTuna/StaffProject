<?php

namespace App\Http\Controllers;

use App\Experience;
use App\Http\Requests\StaffPayment;
use App\Http\Requests\StoreStaffLogin;
use App\Kiosk;
use App\Kioskqrcode;
use App\PaymentHistory;
use App\Staff;
use App\Tio;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class StaffController extends Controller
{

    public function payment(StaffPayment $request)
    {
        $user = $request->userId;
        $pay = (int) $request->pay;

        $staff = Staff::active($user)->first();

        $staff->Balance = ($pay > $staff->Balance) ? 0 : $staff->Balance - $pay;

        if ($staff->Balance != 0 && $pay != 0) {
            $paymentHistory = PaymentHistory::create([
                'type' => 'payment',
                'staff' => $user,
                'pay' => $pay, //TODO: odeme ekleme kismi hatali (odenen tutar bakiyeden fazla bakiye kadarini ekleycek tutari degil)
            ]);
        }
        $staff->save();

        return $this->respondSuccess(['text' => 'successful']);
    }
    public function checkModel($model)
    {
        return count($model) > 0 ? true : false;
    }

    public function register(Request $request)
    {

        $businessId = session("businessId");
        $img = [0 => null];

        $validator = Validator::make($request->all(), [
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
            return response()->json(['status' => false, 'errors' => $errors->all()]);
        }

        if ($request->hasFile('img0')) {
            $image = $request->file('img0');
            $name = time() . rand(1, 100) . '.' . $image->getClientOriginalExtension();
            $destinationPath = public_path('/images');
            $image->move($destinationPath, $name);
            $img[0] = '/public/images/' . $name;
        }

        $staffWorkingPlan = json_decode($request->workingPlan, true);
        $calculatedTime = 0;

        $days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

        foreach ($days as $day) {
            if (isset($staffWorkingPlan[$day]) && count($staffWorkingPlan[$day])) {
                foreach ($staffWorkingPlan[$day] as $result) {
                    $startTime = Carbon::parse($result['start']);
                    $finishTime = Carbon::parse($result['end']);

                    $totalDuration = $finishTime->diffInSeconds($startTime);
                    $calculatedTime += $totalDuration;
                }
            }
        }

        $factorValue = ['hour', 'week', 'month'];
        $factor = array_key_exists($request->factor, $factorValue) ? $request->factor : 'hour';
        $salary = 0;

        switch ($factor) {
            case 'hour':
                $pay = $request->pay / $request->periode;
                $salary = round($pay, 2);
                break;
            case 'week':
                $pay = round(($calculatedTime / 3300), 2) * $request->periode;
                $pay = $request->pay / $pay;
                $salary = round($pay, 2);
                break;
            case 'month':
                $calculatedTime = $calculatedTime * 4;
                $pay = round(($calculatedTime / 3300), 2) * $request->periode;
                $pay = $request->pay / $pay;
                $salary = round($pay, 2);
                break;
        }

        $staff = Staff::create([
            "FirstName" => $request->firstName,
            "LastName" => $request->lastName,
            "Birthday" => $request->birthday,
            'password' => bcrypt($request->password),
            "Image" => $img[0],
            "Adress" => $request->address,
            "Telephone" => $request->telephone,
            "Gsm" => $request->telephone,
            "Email" => $request->email,
            "Gender" => $request->gender,
            "MartialStatus" => $request->martialStatus,
            "Business" => $businessId,
            "Employment" => 1,
            "TimeSheetMap" => 1,
            'workingPlan' => $staffWorkingPlan,
            'Experience' => $request->experience,
            'Factor' => $request->factor,
            'Pay' => $request->pay,
            'Periode' => $request->periode,
            'operationtime' => $calculatedTime,
            'salary' => $salary,
        ]);

        return response()->json([
            'status' => true,
            'text' => 'kayit basarili',
        ]);

    }

    public function delete(Request $request)
    {
        $id = $request->id;

        $staff = Staff::where('id', $id)->update([
            'active' => 0,
        ]);

        return $this->respondSuccess();
    }

    public function staffList(Request $request)
    {
        $staff = Staff::where('Business', session('businessId'))->where('active', 1)->get();
        $factorText = [
            'hour' => 'hourly',
            'week' => 'weekly',
            'month' => 'monthly',
        ];
        $staff = $staff->map(function ($user) use ($factorText) {
            $data = $user;

            $experience = Experience::where('id', $user->Experience)->get();
            $data->Experience = $experience[0]->Identifier;
            $data->Factor = $experience[0]->Periode > 1 ? $experience[0]->Periode . ' ' : ' ' . $factorText[$experience[0]->Factor] . ' ' . $experience[0]->Pay;
            return $user;
        });
        return response()
            ->json($staff);
    }

    public function staffHomePage()
    {
        return view('staff.home');
    }

    public function staffLoginPage($code)
    {
        $kiosk = Kioskqrcode::where('code', $code)->get();

        if ($this->checkModel($kiosk)) {
            $kioskIp = $kiosk[0]->ip;
            $updatedKiosk = Kioskqrcode::where('id', $kiosk[0]->id)->update([
                'active' => 0,
            ]);

            session()->put('registerTime', time());
            session()->put('kioskIp', $kiosk[0]->ip);

            return view('staff.login');

        } else {
            //gecersiz code ise uyari sayfasi goster
            return view('404');
        }
    }

    public function staticStaffLoginPage()
    {
        session()->put('staffLogin', true); //logini kiosk loginden ayirmak icin
        return view('staff.login');
    }

    public function staffLogin(StoreStaffLogin $request)
    {
        if (!session()->has('staffLogin')) {
            if (!session()->has('registerTime')) {
                return response()->json([
                    'status' => false,
                    'text' => 'Qr ve giris cikis islemi sadece tek seferliktir',
                ]);
            }

            if (!(session()->get('registerTime') + 300 >= time())) {
                return response()->json([
                    'status' => false,
                    'text' => 'Oturum acma suresini astiniz',
                ]);
            }
        }


        $staff = Staff::where('email', $request->username)->active()->first();

        if (!$staff == null) {
            return response()->json([
                'status' => false,
                'text' => 'Kullanici adi ve parola hatali',
            ]);
        }

        if (!Hash::check($request->password, $staff->password)) {
            return response()->json([
                'status' => false,
                'text' => 'Parola Hatali',
            ]);
        }

        if (session()->has('staffLogin')) {

            session()->put('staff', $staff->id);
            return response()->json([
                'status' => true,
                'text' => ':)',
            ]);
        }

        $kiosk = $staff->kiosk->where('remoteAddress', session()->get('kioskIp'));


        if ($kiosk != null) {

            $tio = Tio::where('staff', $staff->id)->orderBy('created_at', 'desc')->first();

            if ($tio != null) {
                //staff daha once herhangi giris cikis islemi yapmamaissa
                $newTio = Tio::create([
                    'staff' => $staff->id,
                    'kioskId' => session()->get('kioskIp'),
                    'traffic' => 'Enter',
                    'business' => $staff->business,
                ]);
            } else {
                //staff daha once giris cikis islemi yapmissa
                $newTio = Tio::create([
                    'staff' => $staff->id,
                    'kioskId' => session()->get('kioskIp'),
                    'traffic' => $tio->traffic == 'Enter' ? 'Leave' : 'Enter',
                    'business' => $staff->business,
                ]);

                //user cikis islemi yaptiginda hesaplamaya dahil edilecek fiyati
                if ($tio->traffic == 'Enter') {
                    $difference = time() - $tio->created_at->timestamp;
                    $multiplier = $staff[0]->salary * ($difference / 3300);

                    Tio::where('id', $tio->id)->update(['active' => 0]);
                    Tio::where('id', $newTio->id)->update(['active' => 0]);

                    $oldBalance = $staff->balance;
                    $newBalance = round(($oldBalance + $multiplier), 2);
                    Staff::where('id', $staff->id)->update(['balance' => $newBalance]);
                }
            }

            session()->put('staff', $staff->id);
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

    public function me()
    {
        if (!session()->has('staff')) {
            return response()->json([
                'status' => false,
                'text' => 'before login please',
            ]);
        }

        $staff = Staff::where('id', session('staff'))->get();

        $logHistory = Tio::where('Staff', session('staff'))->orderBy('created_at', 'desc')->limit(10)->get();
        $logCount = Tio::where('Staff', session('staff'))->orderBy('created_at', 'desc')->count();

        $paymentHistory = PaymentHistory::where('active', 1)->where('staff', session('staff'))->orderBy('created_at', 'desc')->limit(10)->get();
        $paymentHistoryTotalCalculatedPrice = PaymentHistory::where('staff', session('staff'))->sum('pay');

        $result = $staff->map(function ($user) use ($paymentHistory, $paymentHistoryTotalCalculatedPrice, $logCount, $logHistory) {
            $data = (object) [];
            $data->status = true;
            $data->user = (object) [];
            $data->user->img = $user->Image;
            $data->user->username = $user->FirstName . ' ' . $user->LastName;
            $experience = Experience::where('id', $user->Experience)->get();
            $data->user->experience = $experience[0]->Identifier;
            $data->user->email = $user->Email;
            $data->user->factor = $user->Factor;
            $data->user->adress = $user->Adress;
            $data->user->phone = $user->Telephone;
            $data->user->Gender = $user->Gender;
            $data->user->martialStatus = $user->MartialStatus;
            $data->user->workingPlan = $user->workingPlan;
            $data->logHistory = (object) [];

            $data->logHistory->balance = $user->Balance;
            $data->logHistory->type = 'log';
            $data->logHistory->logHistory = $logHistory->map(function ($data) {
                $result = (object) [];
                $result->time = $data->Hour;
                $result->traffic = $data->Traffic;
                return $result;
            });
            $data->logHistory->logCount = $logCount;
            $data->logHistory->total = $paymentHistoryTotalCalculatedPrice;
            $data->logHistory->paymentHistory = $paymentHistory->map(function ($data) {
                $result = (object) [];
                $result->pay = $data->pay;
                return $result;
            });
            return $data;
        });

        return response()->json($result);
    }

    public function staffLogout()
    {
        if (!session()->has('staff')) {
            return response()->json([
                'status' => false,
                'text' => 'before login please',
            ]);
        }

        return response()->json([
            'status' => true,
        ]);
    }

    public function index()
    {
        return $this->respondSuccess([
            'name' => 'demo',
        ]);
    }
}
