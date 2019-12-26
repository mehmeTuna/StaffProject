<?php

namespace App\Http\Controllers;

use App\Business;
use App\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BusinessController extends Controller
{

    public function registerPage()
    {
        return view('business.register');
    }

    
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "businessName" => "required|min:3|max:255",
            "businessUsername" => "required|unique:business,Username|max:255",
            "businessEmail" => "email|unique:business,Email",
            "businessAddress" => "max:1024",
            "businessTelephone" => "required|max:40",
            "adminFullName" => "required|max:100",
            "adminTelephone" => "required|max:40",
            "adminPassword" => "required|max:100",
            "workerFullName" => "required|max:100",
            "workerTelephone" => "required|max:100",
            "workerPassword" => "required|max:100",
            "contract" => "required",
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return response (json_encode ($errors->all()));
        }

        $business = Business::create([
            "Email" => $request["businessEmail"],
            "Username" => $request["businessUsername"],
            "Address" => $request["businessAddress"],
            "BusinessName" => $request["businessName"],
            "Phone" => $request["businessTelephone"]
        ]);

        $staffAdmin = Staff::create([
            "FirstName" => $request["adminFullName"],
            "LastName" => $request["adminFullName"],
            "Telephone" => $request["adminTelephone"],
            "Password" => bcrypt($request["adminPassword"]),
            "Business" => $business->Id,
        ]);

        $staffStaff = Staff::create([
            "FirstName" => $request["workerFullName"],
            "LastName" => $request["workerFullName"],
            "Telephone" => $request["workerTelephone"],
            "Password" => bcrypt($request["workerPassword"]),
            "Business" => $business->Id,
        ]);

        session()->put("businessAdmin", [
            "fullName" => $staffAdmin->FirstName ." ". $staffAdmin->LastName ,
            "businessId" => $business->Id,
            "telephone" => $staffAdmin->Telephone,
            "Id" => $staffAdmin->Id 
        ]);
        session()->put("business", [
            "email" => $business->Email,
            "username" => $business->Username,
            "address" => $business->Address,
            "name" => $business->BusinessName,
            "phone" => $business->Phone,
            "careers" => [
                "count" => 0,
                "career" => [],
            ],
            "staffs" => [
                "count" => 0 ,
                "staff" => [],
            ]
        ]);

        return redirect("/{$request['businessUsername']}");
    }

    public function home()
    {
        return view("business.Home");
    }

    public function businessData()
    {
        return response()->json(session()->get("business"));
    }
}
