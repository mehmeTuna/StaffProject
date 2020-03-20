<?php

namespace App\Http\Controllers;

use App\Experience;
use App\Http\Requests\StaffCreateRequest;
use App\Http\Requests\StaffPayment;
use App\Http\Requests\StoreStaffLogin;
use App\Kioskqrcode;
use App\PaymentHistory;
use App\Staff;
use App\Tio;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class StaffController extends Controller
{

    public function payment(StaffPayment $request)
    {
        $user = $request->userId;
        $pay = (int) $request->pay;

        $staff = Staff::active($user)->first();

        $staff->Balance = ($pay > $staff->balance) ? 0 : $staff->balance - $pay;

        if ($staff->balance != 0 && $pay != 0) {
            $paymentHistory = PaymentHistory::create([
                'type' => 'payment',
                'staff' => $user,
                'pay' => $pay, //TODO: odeme ekleme kismi hatali (odenen tutar bakiyeden fazla bakiye kadarini ekleycek tutari degil)
            ]);
        }
        $staff->save();

        return $this->respondSuccess(['text' => 'successful']);
    }

    public function register(StaffCreateRequest $request)
    {

        $businessId = session("businessId");
        $img = [0 => null];


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
            "firstName" => $request->firstName,
            "lastName" => $request->lastName,
            "birthday" => $request->birthday,
            'password' => bcrypt($request->password),
            "image" => $img[0],
            "address" => $request->address,
            "telephone" => $request->telephone,
            "gsm" => $request->telephone,
            "email" => $request->email,
            "gender" => $request->gender,
            "martialStatus" => $request->martialStatus,
            "business" => $businessId,
            "employment" => 1,
            "timeSheetMap" => 1,
            'workingPlan' => $staffWorkingPlan,
            'experience' => $request->experience,
            'factor' => $request->factor,
            'pay' => $request->pay,
            'periode' => $request->periode,
            'operationtime' => $calculatedTime,
            'salary' => $salary,
        ]);

        return response()->json([
            'status' => true,
            'text' => 'success',
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
        $staff = Staff::where('business', session('businessId'))->active()->get();
        $factorText = [
            'hour' => 'hourly',
            'week' => 'weekly',
            'month' => 'monthly',
        ];
        $staff = $staff->map(function ($user) use ($factorText) {
            $data = $user;

            $experience = Experience::where('id', $data->experience)->first();
            $data->experience = $experience->identifier;
            $data->factor = $data->periode > 1 ? $data->periode . ' ' : ' ' . $factorText[$data->factor] . ' ' . $data->pay;
            return $data;
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
        $kiosk = Kioskqrcode::where('code', $code)->first();

        if (  $kiosk == null) {
            return view('404');
        }
            $kioskIp = $kiosk->ip;
            $updatedKiosk = Kioskqrcode::where('id', $kiosk->id)->update([
                'active' => 0,
            ]);

            session()->put('registerTime', time());
            session()->put('kioskIp', $kiosk->ip);

            return view('staff.login');
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

        if ($staff == null) {
            return response()->json([
                'status' => false,
                'text' => 'Username and password incorrect',
            ]);
        }

        if (!Hash::check($request->password, $staff->password)) {
            return response()->json([
                'status' => false,
                'text' => 'password incorrect',
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

        $staff = Staff::where('id', session('staff'))->active()->get();

        $logHistory = Tio::where('staff', session('staff'))->orderBy('created_at', 'desc')->limit(10)->get();
        $logCount = Tio::where('staff', session('staff'))->orderBy('created_at', 'desc')->count();

        $paymentHistory = PaymentHistory::where('active', 1)->where('staff', session('staff'))->orderBy('created_at', 'desc')->limit(10)->get();
        $paymentHistoryTotalCalculatedPrice = PaymentHistory::where('staff', session('staff'))->sum('pay');

        $result = $staff->map(function ($user) use ($paymentHistory, $paymentHistoryTotalCalculatedPrice, $logCount, $logHistory) {
            $data = (object) [];
            $data->status = true;
            $data->user = (object) [];
            $data->user->img = $user->image;
            $data->user->username = $user->firstName . ' ' . $user->lastName;
            $experience = Experience::where('id', $user->experience)->get();
            $data->user->experience = $experience[0]->identifier;
            $data->user->email = $user->email;
            $data->user->factor = $user->factor;
            $data->user->adress = $user->adress;
            $data->user->phone = $user->telephone;
            $data->user->Gender = $user->gender;
            $data->user->martialStatus = $user->martialStatus;
            $data->user->workingPlan = $user->workingPlan;
            $data->logHistory = (object) [];

            $data->logHistory->balance = $user->balance;
            $data->logHistory->type = 'log';
            $data->logHistory->logHistory = $logHistory->map(function ($data) {
                $result = (object) [];
                $result->time = $data->created_at;
                $result->traffic = $data->traffic;
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
