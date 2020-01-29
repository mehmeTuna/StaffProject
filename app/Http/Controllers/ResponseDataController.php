<?php

namespace App\Http\Controllers;

use App\Business;
use App\Experience;
use App\Staff;
use Illuminate\Http\Request;

class ResponseDataController extends Controller
{

    public function isLogin()
    {
        if(!session ()->has('businessId'))
            return response()->json ([
                "status" => false ,
                "text" => "please login before",
            ]);
    }

    public function getBusinessLocationMinWage()
    {
        $this->isLogin();

        $lang = Business::find( session ('businessId'))->minWage;

        return response ()
            ->json ($lang);
    }

    public function experienceList()
    {
        $this->isLogin();

        $response = Experience::where('Business', session ('businessId'))->get();

        return response ()
            ->json ($response);
    }

    public function staffList()
    {
        $this->isLogin();

        $response = Staff::where('Business', session ('businessId'))->get();

        return response ()
            ->json ($response);
    }

}