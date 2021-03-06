<?php

namespace App\Http\Controllers;

use App\Business;
use App\Experience;
use App\Kiosk;
use App\PaymentHistory;
use App\Staff;
use App\Tio;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

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
            $data = (object) [];

            $data->experience = $val;

            //added paginator after
            $allStaff = Staff::where('Experience', $val->Id)->limit(25)->get();

            $data->staffList = $allStaff->map(function ($val) {
                $data = (object) [];

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

    public function staffData(Request $request)
    {
        //type == log ise yapilacak
        //staff Id sine bagli log datalari getir ama ilk etapta 20 tane getir max
        $userId = $request->userId;
        $type = $request->type;

        $staffBalance = Staff::where('id', $userId)->get();

        $logHistory = Tio::where('Staff', $userId)->orderBy('created_at', 'desc')->limit(10)->get();
        $logCount = Tio::where('Staff', $userId)->orderBy('created_at', 'desc')->count();

        $paymentHistory = PaymentHistory::where('active', 1)->where('staff', $userId)->orderBy('created_at', 'desc')->limit(10)->get();
        $paymentHistoryTotalCalculatedPrice = PaymentHistory::where('staff', $userId)->sum('pay');

        return response()->json([
            'status' => true,
            'balance' => $staffBalance[0]->balance,
            'type' => $type,
            'logHistory' => $logHistory,
            'logCount' => $logCount,
            'paymentHistoryData' => [
                'total' => $paymentHistoryTotalCalculatedPrice,
            ],
            'paymentHistory' => $paymentHistory,
        ]);
    }

    public function kioskList()
    {
        $business = Business::where('id', session('businessId'))->with(['kiosk', 'kiosk.logHistory', 'kiosk.logHistory.getUser'])->get() ;
      
        return $this->respondSuccess($business[0]);
    }

    public function kioskDelete(Request $request)
    {
        $id = $request->id;
        $kiosk = Kiosk::where('id', $id)->where('business', session('businessId'))->update([
            'active' => 0,
        ]);

        if($kiosk == 0 )
            return $this->respondFail();

        $kiosk = Kiosk::find($id);
        $kioskId = str_random(40);
        $code = str_random(8);
        Cache::put($code, $kioskId, Carbon::now()->addMinutes(10));

        event(new \App\Events\KioskEvent([
            'isLogin' => false,
            'kioskId' => $kiosk->remoteAddress,
        ]));

        return response()->json([
            'status' => true,
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
                    'footer' => '',
                ],
            ],
        ]);
    }

    public function businessPageSearch(Request $request)
    {
        $queryText = $request->q;
        if (strlen($queryText) <= 3) {
            return response()->json([
                'status' => false,
            ]);
        }

        $staffResult = Staff::where('active', 1)->where('Business', session('businessId'))->where('FirstName', 'like', "%$queryText%")->where('LastName', 'like', "%$queryText%")->get();

        $experinceResult = Experience::where('active', 1)->where('Business', session('businessId'))->where('Identifier', 'like', "%$queryText%")->get();

        $factorText = [
            'hour' => 'hourly',
            'week' => 'weekly',
            'month' => 'monthly',
        ];

        $result['staff'] = $staffResult->map(function ($user) use ($factorText) {
            $data = $user;
            $experience = Experience::where('id', $user->Experience)->get();
            $data->Experience = $experience[0]->Identifier;
            $data->Factor = $experience[0]->Periode > 1 ? $experience[0]->Periode . ' ' : ' ' . $factorText[$experience[0]->Factor] . ' ' . $experience[0]->Pay;
            return $user;
        });

        $result['experience'] = $experinceResult->map(function ($val) {
            $data = (object) [];

            $data->experience = $val;

            //added paginator after
            $allStaff = Staff::where('Experience', $val->Id)->limit(25)->get();

            $data->staffList = $allStaff->map(function ($val) {
                $data = (object) [];

                $data->username = $val->FirstName . ' ' . $val->LastName;
                $data->img = $val->Image;
                $data->balance = $val->Balance;

                return $data;
            });

            return $data;
        });

        return response()->json([
            'status' => true,
            'length' => count($result['staff']) + count($result['experience']),
            'data' => $result,
        ]);
    }

}
