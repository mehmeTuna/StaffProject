<?php

namespace App\Http\Requests;

use App\Business;
use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class StaffDeleteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $business = Business::where('id', session('businessId'))->with(['planDetail'])->first();

        $nowtime = Carbon::now();
        $packageTime = Carbon::parse($business->packageTime);
        $canPackageTime =$nowtime->diffInSeconds($packageTime, false);
        return  $canPackageTime > 0;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'id' => 'bail|required|exists:staff,id'
        ];
    }
}
