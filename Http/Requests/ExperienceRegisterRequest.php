<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExperienceRegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
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
