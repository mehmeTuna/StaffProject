<?php

namespace App\Http\Controllers;

use App\Business;
use App\Experience;
use App\PaymentHistory;
use App\Staff;
use App\Kiosk;
use App\Tio;
use Illuminate\Http\Request;

class ResponseDataController extends Controller
{

    public function getBusinessLocationMinWage()
    {

        $lang = Business::find( session ('businessId'))->minWage;

        return response ()
            ->json ($lang);
    }

    public function experienceList()
    {

        $response = Experience::where('Business', session ('businessId'))->get();

        return response ()
            ->json ($response);
    }

    public function staffList()
    {
        $staff = Staff::where('Business', session ('businessId'))->get();

        $staff = $staff->map(function ($user){
            $experience = Experience::where('Id', $user->Experience)->get();
            $user->Experience = '';
            return $user ;
        });
        return response ()
            ->json ($staff);
    }

    public function staffData(Request $request)
    {
        //type == log ise yapilacak
        //staff Id sine bagli log datalari getir ama ilk etapta 20 tane getir max
        $userId = $request->userId;
        $type= $request->type ;

        $staffBalance = Staff::where('Id', $userId)->get();

        $logHistory= Tio::where('Staff', $userId)->orderBy('created_at', 'desc')->limit(10)->get();
        $logCount= Tio::where('Staff', $userId)->orderBy('created_at', 'desc')->count();

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

        if($pay == '' || $pay <= 0 )
        {
            return response()->json([
                'status' => false ,
                'text' => 'Odeme yapmak icin gecerli deger giriniz'
            ]);
        }

        $staff = Staff::where('Id', $user)->get();

        $newBalance = $staff[0]->Balance - $pay ;
        $newBalance = ($newBalance < 0 ) ? 0 : $newBalance ;
        Staff::where('Id', $user)->update(['Balance' =>  $newBalance]);

        $paymentHistory = PaymentHistory::create([
            'type' => 'payment',
            'staff' => $user,
            'pay' => $pay,
        ]);

        return response()->json([
            'status' => true ,
            'text' => 'Odeme basarili'
        ]);
    }

    public function kioskList()
    {

        $response= Kiosk::where('Business', session ('businessId'))->get();

        return response ()
            ->json ($response);
    }

}