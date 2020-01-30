<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Kiosk;

class KioskController extends Controller
{
    
    function __construct()
    {
        if(!session ()->has('businessId'))
        {
            return response()->json ([
                "status" => false ,
                "text" => "please login before",
            ]);
        }
    }


    public function register()
    {

    }

    public function delete()
    {

    }

    public function login()
    {

    }

    public function generateQr(Request $request)
    {

        $business = session('businessId');
        $kioskIp = $request->ip() ;
        

        return response()->json([
            'business' => session ()->has('businessId'),//$business,
            'kioskIp' => $kioskIp,
        ]);

    }

    public function controllerQr()
    {

    }

    public function logout()
    {

    }


}
