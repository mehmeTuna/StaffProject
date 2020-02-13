<?php

namespace App\Http\Controllers;

use App\Staff;
use App\Career;
use App\Employment;
use Carbon\Carbon;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StaffController extends Controller
{
    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {

        $businessId = session ("businessId");

        $validator = Validator::make($request->all (), [
            'firstName' => 'bail|required|min:3|max:100',
            'lastName' => 'bail|required|min:3|max:100',
            'gender' => 'bail|required|min:3|max:100',
            'martialStatus' => 'bail|required|min:3|max:100',
            'birthday' => 'bail|required|min:3|max:100',
            'address' => 'bail|required|min:3|max:100',
            'telephone' => 'bail|required|min:3|max:100',
            'email' => 'bail|required|min:3|max:100',
            'password' => 'bail|required|min:3|max:100',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return response ()->json (['status' => false , 'errors' => $errors->all()]);
        }

        $staffWorkingPlan = $request->workingPlan ;
        $calculatedTime = 0 ;

        $days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

            for ($counter = 0 ; $counter <= 6; $counter++)
            {
                if(count($staffWorkingPlan[$days[$counter]]))
                {
                    foreach ($staffWorkingPlan[$days[$counter]] as $result)
                    {
                        $startTime = Carbon::parse($result['start']);
                        $finishTime = Carbon::parse($result['end']);

                        $totalDuration = $finishTime->diffInSeconds($startTime);
                       $calculatedTime += $totalDuration ;
                    }
                }
            }

        //employment su asamada ekli degil
        //TODO: meployment kismi eklenecek

        $career = Career::create([
          'BeginTime' => time(),
          'EndTime' => null,
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
          "Image" => null,
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
           'workingPlan' => $request->workingPlan,
           'Experience' => $request->experience,
            'Factor' => $request->factor,
            'Pay' => $request->pay,
            'Periode' => $request->periode,
            'operationtime' => $calculatedTime,
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
}
