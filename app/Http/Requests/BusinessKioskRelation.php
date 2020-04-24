<?php

namespace App\Http\Requests;

use App\Business;
use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class BusinessKioskRelation extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {

        $business = Business::where('id', session('businessId'))->with(['planDetail', 'kiosk'])->first();

        $nowtime = Carbon::now();
        $packageTime = Carbon::parse($business->packageTime);
        $canPackageTime =$nowtime->diffInSeconds($packageTime, false);
        $response =  $business->planDetail->kiosk_count > $business->kiosk->count() &&  ($canPackageTime > 0);
        
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
            //
        ];
    }
}