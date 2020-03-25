<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StaffPayment extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true ;
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
            'pay' => 'required|integer|min:1|max:70000',
            'comment' => 'required|max:100'
        ];
    }
}