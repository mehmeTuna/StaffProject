<?php

namespace App\Http\Controllers;

use App\Business;
use App\Staff;
use App\Experience;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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
            "telephone" => "required|max:40",
            'email' => 'email',
            "password" => "required|max:100",
            ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return response ()->json ($errors->all());
        }

        $business = Business::create([
            "Email" => $request["email"],
            "Username" => str_slug ($request["businessName"]),
            "BusinessName" => $request["businessName"],
            "Phone" => $request["telephone"],
            "Password" => Hash::make($request["password"]),
            "Country" => "TR_tr",
            "Lang" => "TR_tr",
        ]);

        session()->put("businessId", $business->Id);
        return redirect("/{$business->Username}");
    }

    public function home()
    {
        if(!session()->has("businessId"))
            return view('business.register');

            return view("business.Home");
    }

    public function businessData()
    {
        if(!session()->has("businessId"))
            return view('business.register');

        $id = session()->get("businessId");
        $business = Business::where("id", $id)->get();

        $staffCount = Staff::where("Business", $id)->count();
        $experienceCount = Experience::where("Business", $id)->count();


        return response()->json([
            "email" => $business[0]->Email,
            "username" => $business[0]->Username,
            "img" => $business[0]->Image,
            "name" => $business[0]->BusinessName,
            "staff" => $staffCount,
            "experience" => $experienceCount
        ]);
    }
}
