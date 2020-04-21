<?php

namespace App\Http\Requests;

use App\Staff;
use Illuminate\Foundation\Http\FormRequest;

class BusinessStaffRelationship extends FormRequest
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
        return [
            'userId' => 'required|integer',
            'pay' => 'sometimes|integer|min:1|max:70000',
            'comment' => 'sometimes|max:100'
        ];
    }

    public function messages()
    {
        return [
        ];
    }

    /**
     *  Filters to be applied to the input.
     *
     * @return array
     */
    public function filters()
    {
        return [
        ];
    }
}
