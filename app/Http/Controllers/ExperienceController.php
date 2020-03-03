<?php

namespace App\Http\Controllers;

use App\Experience;
use App\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ExperienceController extends Controller
{
    public function register(Request $request)
    {

        $businessId = session ("businessId");

        $validator = Validator::make($request->all (), [
            'experienceName' => 'bail|required|min:3|max:100',
            'experiencePay' => 'bail|required|numeric',
            'experienceFactor' => 'bail|required',
            'experiencePeriode' => 'bail|required|numeric',
            'workingPlan' => 'bail|required',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return response ()->json ($errors->all());
        }


        $workClass = ['freeTime', 'plannedTime', 'fullTime'];//TODO: db den al ona kontrol et sonraki adimda
        if(!in_array ($request->workingPlan, $workClass))
            return response()->json (['status' => false, 'workingPlan' => 'not defined']);


        $workPlan = array_keys($workClass, $request->workingPlan); //db ye sayisal olarak eklenecek

        $experience = Experience::create([
            "WorkClass" =>  $workPlan[0],
            "Color" => null,
            'OwnerClass' => 0,
            'Business' => $businessId,
            'Identifier' =>  $request->experienceName,
            'Class' => 1 , //TODO: business tablosundan kontrol edilip eklenecek,
            'Periode' => $request->experiencePeriode,
            'Factor' => $request->experienceFactor,
            'Pay' => $request->experiencePay,
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
            'text' => 'kayit basarili'
        ]);

    }

    public function listData()
    {
        $experience = Experience::where('Business', session('businessId'))->where('active', 1)->get();

        $result = $experience->map(function ($val) {
            $data = (object)[];

            $data->experience = $val;

            //added paginator after
            $allStaff = Staff::where('Experience', $val->Id)->where('active', 1)->limit(25)->get();

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

    public function delete(Request $request)
    {
        $id = $request->id;

        $experience = Experience::where('Id', $id)->update([
            'active' => 0
        ]);

        return $this->respondSuccess() ;
    }
}
