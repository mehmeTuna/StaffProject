<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Business ;
use Carbon\Carbon;

class StaffCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $business = Business::where('id', session('businessId'))->with(['planDetail', 'staff'])->first();

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
        //TODO: img kontrol et kismi eklenecek
        return [
            'firstName' => 'bail|required|min:3|max:100',
            'lastName' => 'bail|required|min:3|max:100',
            'gender' => 'bail|required|min:3|max:100',
            'martialStatus' => 'bail|required|min:3|max:100',
            'birthday' => 'bail|required|date|before:tomorrow',
            'address' => 'bail|required|min:3|max:100',
            'telephone' => 'bail|required|min:3|max:100',
            'email' => 'bail|required|min:3|max:100|unique:staff,Email',
            'password' => 'bail|required|min:3|max:100',
            'workingPlan' => 'bail|required',
            'experience' => 'bail|required|exists:experience,id' ,//TODO: sorgu ekle aktif olan experience olmali
            'pay' => 'bail|required|integer',
            'factor' => 'bail|required|min:2|max:15',
            'periode' => 'bail|required|integer'
        ];
    }
}
