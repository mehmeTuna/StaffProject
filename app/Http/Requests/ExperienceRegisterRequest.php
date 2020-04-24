<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Business ;
use Carbon\Carbon;

class ExperienceRegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    { 
        $business = Business::where('id', session('businessId'))->with(['planDetail', 'experience'])->first();

        $nowtime = Carbon::now();
        $packageTime = Carbon::parse($business->packageTime);
        $canPackageTime =$nowtime->diffInSeconds($packageTime, false);
        $response =  $business->planDetail->experience_count > $business->experience->count() &&  ($canPackageTime > 0);
        
        return $response;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'experienceName' => 'bail|required|min:3|max:100',
            'experiencePay' => 'bail|required|numeric',
            'experienceFactor' => 'bail|required',
            'experiencePeriode' => 'bail|required|numeric',
            'workingPlan' => 'bail|required',
        ];
    }
}