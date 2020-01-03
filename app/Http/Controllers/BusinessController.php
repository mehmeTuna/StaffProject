<?php

namespace App\Http\Controllers;

use App\Business;
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

        session ("businessId", $business->Id);
        return redirect("/{$business->Username}");
    }

    public function home()
    {
        dd (session()->all());
        $business = Business::where( "Id" ,session()->get("businessId"));

        dd($business);

        return view("business.Home");
    }

    public function businessData()
    {
        return response()->json(session()->get("business"));
    }
}
