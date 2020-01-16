<?php

namespace App\Http\Controllers;

use App\Business;
use App\Staff;
use Illuminate\Http\Request;

class ResponseDataController extends Controller
{
    public function getBusinessLocationMinWage()
    {
        if(!session ()->has('businessAdmin'))
            return response()->json ([
                "status" => false ,
                "text" => "please login before",
            ]);

        $data = session ('businessAdmin');
        $business = Business::find($data["businessId"])->minWage;

        return response ()
            ->json ($business);
    }

    public function getBusinessStaffList()
    {
        if(!session ()->has('businessId'))
            return response()->json ([
                "status" => false ,
                "text" => "please login before",
            ]);

        $data = session ('businessAdmin');
        $staffList = Staff::where("Business", $data)->get();

        return response ()
            ->json ($staffList->toArray());
    }
}
