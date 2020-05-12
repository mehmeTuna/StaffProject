<?php

namespace App\Http\Requests;

use App\Business;
use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class ExperienceUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $business = Business::where('id', session('businessId'))
            ->with(['planDetail', 'experience'])
            ->first();

        $nowtime = Carbon::now();
        $packageTime = Carbon::parse($business->packageTime);
        $canPackageTime =$nowtime->diffInSeconds($packageTime, false);
        return $business->planDetail->staff_count > $business->staff->count() &&  ($canPackageTime > 0);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'id' => 'required'
        ];
    }
}
