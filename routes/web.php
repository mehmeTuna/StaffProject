<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


//herhangi bir url eslesme olmaz ise bu sayfa goruntulenecek
Route::any('/', 'WelcomeController@index');

Route::get('404', 'WelcomeController@noPage');
Route::get('forget-password', 'WelcomeController@index');

Route::get('kiosk', 'KioskController@kioskRegisterPage');
Route::get('login', 'BusinessController@loginPage');

Route::get('staff/login', 'StaffController@staticStaffLoginPage');
Route::post('kiosk/staff/login', 'StaffController@staffLogin');

Route::prefix('kiosk')->group(function () {
    Route::get('staff/{code}', 'StaffController@staffLoginPage');
    Route::post('me', 'KioskController@me');
    Route::post('register', 'KioskController@AddNewKiosk');
    Route::get('generate', 'KioskController@controllerQr');
});

Route::middleware(['staff'])->group(function(){
    Route::prefix('staff')->group(function(){
        Route::get('home', 'StaffController@staffHomePage');
        Route::post('me', 'StaffController@me');
        Route::post('logout', 'StaffController@staffLogout');
    });
});

Route::prefix('business')->group(function(){
  Route::post('loginData', 'BusinessController@login');
  Route::post('register', 'BusinessController@register'); //isletme kayit icin post edilecek yer


  //kiosk islemleri bu kisim istekleri  sadece  kiosk requestleri icin dir
  Route::post('kiosk/code/generate', 'KioskController@generateId');
  Route::post('kiosk/add', 'KioskController@AddNewKiosk');

  Route::get('kiosk/qr/generate', 'KioskController@generateQr');
});

//business route add middleware
Route::middleware(['business'])->group(function(){

    Route::prefix('business')->group(function (){
        //data controller
        Route::post('data', 'BusinessController@businessData');
        Route::post('update', 'BusinessController@update');
        Route::post('logout', 'BusinessController@logout');
        Route::post('search', 'ResponseDataController@businessPageSearch');

        Route::post("staff/list", 'StaffController@staffList');
        Route::post("staff/payment/history", 'StaffController@paymentHistory');
        Route::post("staff/log/history", 'StaffController@logHistory');
        Route::post('staff/pay', 'StaffController@payment');
        Route::post("staff/delete", 'StaffController@delete');

        Route::post("experience/list/{page}/{count}", 'ExperienceController@listData');
        Route::post("experience/list", 'ExperienceController@listEx');
        Route::post("experience/delete", 'ExperienceController@delete');

        Route::post("kiosk/list", 'ResponseDataController@kioskList');
        Route::post("kiosk/delete", 'ResponseDataController@kioskDelete');

        Route::post("location/minWage", 'ResponseDataController@getBusinessLocationMinWage');
        Route::post("data/home", 'BusinessController@homeData');
    });

    //business route group
    Route::prefix('/{businessUsername}')->group(function(){

        Route::get('/', 'BusinessController@home');

        Route::get('profile', 'BusinessController@home');

        Route::prefix('/staff')->group(function(){
            Route::get('/list', 'BusinessController@home');
            Route::get('/create', 'BusinessController@home');

            Route::post('/create', 'StaffController@register');
        });

        Route::prefix('/experience')->group(function(){
            Route::get('/list', 'BusinessController@home');
            Route::get('/create', 'BusinessController@home');

            Route::post('/create', 'ExperienceController@register');
        });

        Route::prefix('/kiosk')->group(function(){
            Route::get('list', 'BusinessController@home');
            Route::get('/create', 'BusinessController@home');

            Route::post('/create', 'KioskController@AddNewKiosk');
        });
    });

    Route::post('user/data', 'ResponseDataController@staffData');
    Route::post('business/statistics', 'ResponseDataController@statistics');
});
