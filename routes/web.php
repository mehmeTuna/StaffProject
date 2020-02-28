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

Route::get('kiosk', 'KioskController@kioskRegisterPage');
Route::get('login', 'BusinessController@loginPage');
Route::get('staff/home', 'StaffController@staffHomePage');
Route::get('staff/login', 'StaffController@staticStaffLoginPage');
Route::post('staff/me', 'StaffController@staffMe');
Route::post('staff/logout', 'StaffController@staffLogout');
Route::post('kiosk/staff/login', 'StaffController@staffLogin');

Route::prefix('kiosk')->group(function () {
    Route::get('staff/{code}', 'KioskController@staffLoginPage');
    Route::post('me', 'KioskController@me');
    Route::post('register', 'KioskController@AddNewKiosk');
    Route::get('generate', 'KioskController@controllerQr');
});

Route::prefix('business')->group(function(){
  Route::post('loginData', 'BusinessController@login');
  Route::post('logout', 'BusinessController@logout');
  Route::post('register', 'BusinessController@register'); //isletme kayit icin post edilecek yer
  Route::post('data', 'BusinessController@businessData');

  //kiosk islemleri bu kisim istekleri  sadece  kiosk requestleri icin dir
  Route::post('kiosk/code/generate', 'KioskController@generateId');
  Route::post('kiosk/add', 'KioskController@AddNewKiosk');

  Route::get('kiosk/qr/generate', 'KioskController@generateQr');
});

//business route add middleware
Route::middleware(['business'])->group(function(){

    Route::prefix('business')->group(function (){
        //data controller
        Route::post("staff/list", 'ResponseDataController@staffList');
        Route::post("experience/list", 'ResponseDataController@experienceList');
        Route::post("experience/list/data", 'ResponseDataController@experienceListData');
        Route::post("kiosk/list", 'ResponseDataController@kioskList');
        Route::post("kiosk/delete", 'ResponseDataController@kioskDelete');
        Route::post("location/minWage", 'ResponseDataController@getBusinessLocationMinWage');
    });

    //business route group
    Route::prefix('/{businessUsername}')->group(function(){

        Route::get('/', 'BusinessController@home');

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
    Route::post('user/balance/payment', 'ResponseDataController@staffPaymentHistoryUpdate');
    Route::post('business/statistics', 'ResponseDataController@statistics');
});