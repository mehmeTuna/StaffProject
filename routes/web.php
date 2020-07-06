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

require_once __DIR__.'/staticPage.php';

Route::get('getRedis', 'KioskController@getRedis');
Route::get('test-broadcast', function(){
   event(new \App\Events\KioskEvent('huvK8MKqJK3WKe4aHh1GbMqZblOK1EJgdPMDyGGv'));
});

Route::post('staff/login', 'StaffController@staffLogin');

Route::prefix('kiosk')->group(function () {
    Route::get('staff/{code}', 'StaffController@staffLoginPage');
    Route::post('register', 'KioskController@AddNewKiosk');
});

Route::middleware(['staff'])->group(function(){
    Route::prefix('staff')->group(function(){
        Route::post('me', 'StaffController@me');
        Route::post('logout', 'StaffController@staffLogout');
    });
});

Route::prefix('business')->group(function(){
  Route::post('loginData', 'BusinessController@login');
  Route::post('register', 'BusinessController@register');

  //kiosk islemleri bu kisim istekleri  sadece  kiosk requestleri icin dir
  Route::post('kiosk/code/generate', 'KioskController@generateId');
  Route::post('kiosk/add', 'KioskController@AddNewKiosk');
});


Route::prefix('v1')->group(function(){
    Route::prefix('business')->group(function(){
        Route::get('data', 'BusinessController@businessData');
    });
    Route::prefix('kiosk')->group(function(){
        Route::post('me', 'KioskController@me');
    });
});

//business route add middleware
Route::middleware(['business'])->group(function(){

    Route::prefix('business')->group(function (){
        //data controller
        Route::post('data', 'BusinessController@businessData');
        Route::post('update', 'BusinessController@update');
        Route::post('logout', 'BusinessController@logout');

        Route::post("staff/list", 'StaffController@staffList');
        Route::post("staff/payment/history", 'StaffController@paymentHistory');
        Route::post("staff/log/history", 'StaffController@logHistory');
        Route::post('staff/pay', 'StaffController@payment');
        Route::post("staff/delete", 'StaffController@delete');

        Route::post("experience/list/all", 'ExperienceController@listData');
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
        Route::get('/{secondTag}', 'BusinessController@home');
        Route::post('/staff/create', 'StaffController@register');
        Route::post('/experience/create', 'ExperienceController@register');
        Route::post('/kiosk/create', 'KioskController@AddNewKiosk');
    });

    Route::post('user/data', 'ResponseDataController@staffData');
    Route::post('business/statistics', 'ResponseDataController@statistics');
});
