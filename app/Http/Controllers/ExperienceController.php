<?php

namespace App\Http\Controllers;

use App\Experience;
use App\Http\Requests\ExperienceRegisterRequest;
use App\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ExperienceController extends Controller
{
    public function register(ExperienceRegisterRequest $request)
    {
        $businessId = session ("businessId");

        $workClass = ['freeTime', 'plannedTime', 'fullTime'];//TODO: db den al onu kontrol et sonraki adimda
        if(!in_array ($request->workingPlan, $workClass))
            return response()->json (['status' => false, 'workingPlan' => 'not defined']);

        $workPlan = array_keys($workClass, $request->workingPlan); //db ye sayisal olarak eklenecek

        $experience = Experience::create([
            "workClass" =>  $workPlan[0],
            'business' => $businessId,
            'identifier' =>  $request->experienceName,
            'class' => 1 , //TODO: business tablosundan kontrol edilip eklenecek,
            'periode' => $request->experiencePeriode,
            'factor' => $request->experienceFactor,
            'pay' => $request->experiencePay,
            'workingPlan' => [
                'monday' => $request->monday,
                'tuesday' => $request->tuesday,
                'wednesday' => $request->wednesday,
                'thursday' => $request->thursday,
                'friday' => $request->friday,
                'saturday' => $request->saturday,
                'sunday' => $request->sunday
            ]
        ]);

        return response ()->json([
            'status' => true,
            'text' => 'success'
        ]);
    }

    public function listData()
    {
        $experience = Experience::where('business', session('businessId'))->where('active', 1)->get();

        $result = $experience->map(function ($val) {
            $data = (object)[];

            $data->experience = $val;
            //added paginator after
            $allStaff = Staff::where('experience', $val->id)->where('active', 1)->limit(25)->get();

            $data->staffList = $allStaff->map(function ($val) {
                $data = (object)[];

                $data->username = $val->firstName . ' ' . $val->lastName;
                $data->img = $val->image;
                $data->balance = $val->balance;
                return $data;
            });
            return $data;
        });
        return response()
            ->json($result);
    }

    public function delete(Request $request)
    {
        $id = $request->id;

        $experience = Experience::where('id', $id)->update([
            'active' => 0
        ]);

        return $this->respondSuccess() ;
    }
}
