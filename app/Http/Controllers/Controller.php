<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function respondSuccess($data = [])
    {
        return response()->json([
            'status' => true,
            'text' => trans('auth.success'),
            'data' => $data
        ]);
    }

    public function respondFail($data = [])
    {
        return response()->json([
            'status' => false,
            'text' => trans('auth.error'),
            'data' => $data
        ]);
    }

    public function incorrectPassword($data = [])
    {
        return response()->json([
            'status' => false,
            'text' => trans('auth.incorrectPassword'),
            'data' => $data
        ]);
    }


}
