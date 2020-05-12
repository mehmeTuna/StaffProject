<?php

namespace App\Http\Requests;

use App\Staff;
use Illuminate\Foundation\Http\FormRequest;

class BusinessProfileUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        if($this->session()->has('businessId')){
            return false ;
        }
        $staff = Staff::find((int)$this->request->userId)->with('businessOwner')->active();
        if($staff == null){
            return false ;
        }

        return $staff->businessOwner->id == $this->session()->get('businessId');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        //TODO: bu kisimda business update edilirkenki kurallar yazilacak
        return [
            'name' => 'sometimes|min:3|max:50',
            'password' => 'sometimes|min:3|max:50',
            'email' => 'sometimes|email|unique:business',
            'address' => 'sometimes|min:3|max:50',
            'webPage' => 'sometimes|min:3|max:50',
            'phone' => 'sometimes|min:3|max:50',
            'img' => 'sometimes|mimes:jpg,jpeg,png|'
        ];
    }
}
