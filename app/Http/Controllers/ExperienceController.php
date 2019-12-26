<?php

namespace App\Http\Controllers;

use App\Business;
use App\Charge;
use App\Experience;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ExperienceController extends Controller
{
    public function register(Request $request)
    {
        $businessAdmin = session ("businessAdmin");
        $businessId = $businessAdmin["businessId"];
        $business = Business::find(  $businessId);


        $validator = Validator::make($request->all (), [
            "name" =>"required|min:3|max:100",
            "pay" =>"required",
            "factor" => "required",
            "periode" => "required",
            "workingClass" =>"required",
            "workingPlanData" => "required",
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return response ()->json ($errors->all());
        }


        $workClass = [ 0, 1, 2];
        if(!in_array ($request->workingClass, $workClass))
            return response()->json (["working-plan" => "not defined"]);
        $workClass = $request->workingClass;

        //TODO: yeni veri eklendiğinde eski json yapısı silinmemesi lazım ona bir çözüm bul
        //şu an içn eskini siler yenisini yazar
        $business->update(["ExperienceClass", ["id"=>1, "name" => $request->workingClass]]);

        $experience = Experience::create([
            "WorkClass" =>  $workClass,
            "Color" => null,
            "Business" => $business->Id,
            "Identifier" => $request->name,
            "Class" => 1,
        ]);

        $charge = Charge::create([
            "manager" => $businessAdmin["Id"],
            "Business" => $business["Id"],
            "Periode" => $request->periode,
            "Factor" => $request->factor,
            "Pay" => $request->pay,
            "Experience" => $experience->Id,
        ]);

        $experience->update (["Charge" => $charge->Id]);

        return response ("basarılı");

    }
}
