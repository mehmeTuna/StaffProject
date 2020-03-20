<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBusinessRegister extends FormRequest
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
            "businessName" => "required|min:3|max:255",
            "telephone" => "required|min:3|max:40",
            'email' => 'email|required|unique:business,email',
            "password" => "required|min:3|max:100",
        ];
    }
}
