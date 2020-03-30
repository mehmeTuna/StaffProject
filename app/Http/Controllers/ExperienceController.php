<?php

namespace App\Http\Controllers;

use App\Business;
use App\Experience;
use App\Http\Requests\ExperienceRegisterRequest;
use App\Staff;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    protected $businessId = null;

    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->businessId = session('businessId', null);
            return $next($request);
        });
    }

    public function register(ExperienceRegisterRequest $request)
    {
        $businessId = session("businessId");

        $workClass = ['freeTime', 'plannedTime', 'fullTime'];
        if (!in_array($request->workingPlan, $workClass)) {
            return response()->json(['status' => false, 'workingPlan' => 'not defined']);
        }

        $workPlan = array_keys($workClass, $request->workingPlan); //db ye sayisal olarak eklenecek

        $experience = Experience::create([
            "workClass" => $workPlan[0],
            'business' => $businessId,
            'identifier' => $request->experienceName,
            'class' => 1,
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
                'sunday' => $request->sunday,
            ],
        ]);

        return response()->json([
            'status' => true,
            'text' => 'success',
        ]);
    }

    public function delete(Request $request)
    {
        $id = $request->id;

        $experience = Experience::where('id', $id)->update([
            'active' => 0,
        ]);

        return $this->respondSuccess();
    }

    public function listData($page = 1, $count = 20)
    {
        if ((int) $page > 10 || (int) $count > 60) {
            return $this->respondFail();
        }

        $perPage = ($page - 1) * $count;
        $business = Business::find($this->businessId);
        if($business == null){
            return $this->respondSuccess([]);
        }

        $experience = $business->experience()->take($perPage)->limit($count)->get();

        $experience = $experience->map(function ($experience) use($business){
            $data = (object) [];
            $data->id = $experience->id;
            $data->workingPlan = $experience->workingPlan;
            $data->pay = $experience->pay;
            $data->periode = $experience->periode;
            $data->factor = $experience->factor;
            $data->color = $experience->color;
            $data->identifier = $experience->identifier;
            $data->currencySymbol = $business->data->currencySymbolUtf8;
            $data->created_at = $experience->created_at->toDateString();
            $data->staffList = Staff::where('experience', $experience->id)->where('active', 1)->get();
            return $data;
        });

        return $this->respondSuccess($experience);
    }

    public function listEx()
    {
        $business = Business::where('id', $this->businessId)->active()->first();
        $experience = $business->experience()->get();

        return $this->respondSuccess($experience);
    }
}
