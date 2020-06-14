<?php

Route::any('/', function(){
    return view('front');
});

Route::get('404', function(){
    return view('404');
});

Route::get('forget-password', function(){
    return view('forgetPassword');
});

Route::get('kiosk', function(){
    return view('kioskRegister');
})->name('kioskHome');

Route::prefix('kiosk')->group(function(){
    Route::get('/', function(){
        return view('kioskRegister');
    })->name('kioskHome');
});

Route::get('login', function (){
    return view('business.login');
});

Route::get('staff/login', function(){
    return view('staff.login');
});

Route::prefix('staff')->group(function(){
    Route::get('home', function(){
    return view('staff.home');
    })->middleware('staff');
});