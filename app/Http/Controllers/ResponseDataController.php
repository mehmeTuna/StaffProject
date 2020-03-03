<?php

namespace App\Http\Controllers;

use App\Business;
use App\Experience;
use App\PaymentHistory;
use App\Staff;
use App\Kiosk;
use App\Tio;
use Illuminate\Http\Request;
use function foo\func;

class ResponseDataController extends Controller
{

    public function getBusinessLocationMinWage()
    {

        $lang = Business::find(session('businessId'))->minWage;

        return response()
            ->json($lang);
    }

    public function experienceListData()
    {
        $experience = Experience::where('Business', session('businessId'))->get();

        $result = $experience->map(function ($val) {
            $data = (object)[];

            $data->experience = $val;

            //added paginator after
            $allStaff = Staff::where('Experience', $val->Id)->limit(25)->get();

            $data->staffList = $allStaff->map(function ($val) {
                $data = (object)[];

                $data->username = $val->FirstName . ' ' . $val->LastName;
                $data->img = $val->Image;
                $data->balance = $val->Balance;

                return $data;
            });

            return $data;
        });

        return response()
            ->json($result);
    }

    public function experienceList()
    {
        $experience = Experience::where('Business', session('businessId'))->get();

        return response()
            ->json($experience);

    }

    public function staffList()
    {
        $staff = Staff::where('Business', session('businessId'))->get();
        $factorText = [
            'hour' => 'hourly',
            'week' => 'weekly',
            'month' => 'monthly'
        ];
        $staff = $staff->map(function ($user) use ($factorText) {
            $data = $user;

            $experience = Experience::where('Id', $user->Experience)->get();
            $data->Experience = $experience[0]->Identifier;
            $data->Factor = $experience[0]->Periode > 1 ? $experience[0]->Periode . ' ' : ' ' . $factorText[$experience[0]->Factor] . ' ' . $experience[0]->Pay;
            return $user;
        });
        return response()
            ->json($staff);
    }

    public function staffData(Request $request)
    {
        //type == log ise yapilacak
        //staff Id sine bagli log datalari getir ama ilk etapta 20 tane getir max
        $userId = $request->userId;
        $type = $request->type;

        $staffBalance = Staff::where('Id', $userId)->get();

        $logHistory = Tio::where('Staff', $userId)->orderBy('created_at', 'desc')->limit(10)->get();
        $logCount = Tio::where('Staff', $userId)->orderBy('created_at', 'desc')->count();

        $paymentHistory = PaymentHistory::where('active', 1)->where('staff', $userId)->orderBy('created_at', 'desc')->limit(10)->get();
        $paymentHistoryTotalCalculatedPrice = PaymentHistory::where('staff', $userId)->sum('pay');

        return response()->json([
            'status' => true,
            'balance' => $staffBalance[0]->Balance,
            'type' => $type,
            'logHistory' => $logHistory,
            'logCount' => $logCount,
            'paymentHistoryData' => [
                'total' => $paymentHistoryTotalCalculatedPrice
            ],
            'paymentHistory' => $paymentHistory
        ]);
    }

    public function staffPaymentHistoryUpdate(Request $request)
    {
        $user = $request->userId;
        $pay = $request->pay;

        if ($pay == '' || $pay <= 0) {
            return response()->json([
                'status' => false,
                'text' => 'Odeme yapmak icin gecerli deger giriniz'
            ]);
        }

        $staff = Staff::where('Id', $user)->get();

        $newBalance = $staff[0]->Balance - $pay;
        $newBalance = ($newBalance < 0) ? 0 : $newBalance;
        Staff::where('Id', $user)->update(['Balance' => $newBalance]);

        if ($newBalance > 0) {
            $paymentHistory = PaymentHistory::create([
                'type' => 'payment',
                'staff' => $user,
                'pay' => $pay,
            ]);
        }

        return response()->json([
            'status' => true,
            'text' => 'Odeme basarili'
        ]);
    }

    public function kioskList()
    {

        $response = Kiosk::where('Business', session('businessId'))->where('active', 1)->get();

        $result = $response->map(function ($val) {
            $data = (object)[];
            $data->id = $val->Id;
            $data->name = $val->Identifier;
            $data->ip = $val->RemoteAddress;
            $data->comment = $val->Comment;

            $business = Business::where('Id', session('businessId'))->get();
            $data->businessName = $business[0]->Username;

            $logHistory = Tio::where('Business', $val->Business)->where('KioskId', $data->id)->limit(10)->orderBy('created_at', 'desc')->get();
            $logHistoryCount = Tio::where('Business', $val->Business)->where('KioskId', $data->id)->count();

            $data->logHistory = $logHistory->map(function ($val) use ($logHistoryCount) {
                $data = (object)[];
                $data->count = $logHistoryCount;
                $user = Staff::where('Id', $val->Staff)->get();
                $data->username = $user[0]->Firstname . ' ' . $user[0]->LastName;
                $data->plan = $user[0]->workingPlan;
                $data->date = $val->created_at->toDateTimeString();
                $data->status = $val->Traffic;
                return $data;
            });

            return $data;
        });

        return response()
            ->json($result);
    }

    public function kioskDelete(Request $request)
    {
        $id = $request->id;
        $kiosk = Kiosk::where('Id', $id)->where('Business', session('businessId'))->update([
            'active' => 0
        ]);

        return response()->json([
            'status' => true
        ]);
    }

    public function statistics(Request $request)
    {
        return response()->json([
            'status' => true,
            'alert' => [
                [
                    'type' => 'content',
                    'title' => 'Ooooooops kullanim sureniz sona eriyor.',
                    'content' => 'Isterseniz <a href="' . 'http://' . $request->getHost() . '/#section-pricing">Planlarimiza</a> goz atabilirsiniz.',
                    'footer' => ''
                ]
            ],
        ]);
    }

}