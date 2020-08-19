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

Route::get('demo', function (){
    dispatch(new \App\Jobs\BusinessEntranceExitJob(1, 'login'));
});

Route::post('staff/login', 'StaffController@login');

Route::prefix('kiosk')->group(function () {
    Route::get('staff/{code}', 'StaffController@staffLoginPage');
});

Route::middleware(['staff'])->group(function(){
    Route::prefix('staff')->group(function(){
        Route::post('me', 'StaffController@me');
        Route::post('logout', 'StaffController@staffLogout');
    });
});

Route::prefix('business')->group(function(){
  Route::post('loginData', 'BusinessController@login');
  Route::post('login', 'BusinessController@login');
  Route::post('register', 'BusinessController@register');

  //kiosk islemleri bu kisim istekleri  sadece  kiosk requestleri icin dir
  Route::post('kiosk/code/generate', 'KioskController@generateId');
  Route::post('kiosk/add', 'KioskController@AddNewKiosk');
});

//business route add middleware
Route::middleware(['business'])->group(function(){
  Route::prefix('v1')->group(function(){
      Route::prefix('business')->group(function(){
          Route::get('data', 'BusinessController@businessData');
      });
      Route::prefix('staff')->group(function(){
          Route::get('list', 'StaffController@getList');
          Route::post('profile', 'StaffController@getProfile');
          Route::post("payment/history", 'StaffController@paymentHistory');
          Route::post("log/history", 'StaffController@logHistory');
      });
      Route::prefix('kiosk')->group(function(){
          Route::post('me', 'KioskController@me');
          Route::post('register', 'KioskController@AddNewKiosk');
      });
      Route::prefix('experience')->group(function(){
          Route::post('create', 'ExperienceController@register');
          Route::get("list/all", 'ExperienceController@listData');
          Route::post("delete", 'ExperienceController@delete');
      });
      Route::post("location/minWage", 'ResponseDataController@getBusinessLocationMinWage');
  });

    Route::prefix('business')->group(function (){
        //data controller
        Route::post('data', 'BusinessController@businessData');
        Route::post('update', 'BusinessController@update');
        Route::get('logout', 'BusinessController@logout');

        Route::post("staff/list", 'StaffController@staffList');
        Route::post('staff/pay', 'StaffController@payment');
        Route::post("staff/delete", 'StaffController@delete');

        Route::post("experience/list", 'ExperienceController@listEx');

        Route::post("kiosk/list", 'ResponseDataController@kioskList');
        Route::post("kiosk/delete", 'ResponseDataController@kioskDelete');

        Route::post("data/home", 'BusinessController@homeData');
    });

    //business route group
    Route::prefix('/{businessUsername}')->group(function(){
        Route::get('/', 'BusinessController@home');
        Route::get('/{first}', 'BusinessController@home');
        Route::get('/{first}/{second}', 'BusinessController@home');
        Route::get('/{first}/{second}/{third}', 'BusinessController@home');
        Route::get('/{first}/{second}/{third}/{fourth}', 'BusinessController@home');
        Route::get('/{first}/{second}/{third}/{fourth}/{fifth}', 'BusinessController@home');
        Route::post('/staff/create', 'StaffController@register');
        Route::post('/kiosk/create', 'KioskController@AddNewKiosk');
    });

    Route::post('user/data', 'ResponseDataController@staffData');
    Route::post('business/statistics', 'ResponseDataController@statistics');
});
