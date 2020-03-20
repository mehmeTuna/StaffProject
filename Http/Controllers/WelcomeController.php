<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WelcomeController extends Controller
{
    public function noPage() {
        return view('404');
    }

    public function index()
    {
        return view('front');
    }
}
