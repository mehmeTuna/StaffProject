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

Route::get('qr-code', function () {
  return QrCode::size(500)->generate('Mehmet Tuna Qr Code kısmı');
});

Route::get('404', 'WelcomeController@noPage');


Route::get('/clear-cache', function() {
    Artisan::call('cache:clear');
    return "Cache is cleared";
});

//business route add middleware
Route::middleware(['business'])->group(function(){
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
});

Route::prefix('kiosk')->group(function () {
  Route::get('staff/{code}', 'KioskController@staffLoginPage');
  Route::post('staff/login', 'KioskController@staffLogin');
  Route::get('ekle', 'KioskController@kioskRegisterPage'); //kiosk kayit sayfasi
  Route::post('ekle', 'KioskController@kioskRegisterControl'); //kiosk kayit sayfasi
});

Route::middleware(['kiosk'])->group(function(){
  Route::prefix('kiosk')->group(function () {
    Route::get('generate', 'KioskController@controllerQr');
    Route::get('anasayfa', 'KioskController@home');//kiosk anasayfa
    Route::post('login', 'KioskController@login');//kiosk data
    Route::post('me', 'KioskController@me');//kiosk data
  });
});

Route::prefix('business')->group(function(){
  Route::get('giris', 'BusinessController@loginPage');
  Route::post('loginData', 'BusinessController@login');
  Route::post('logout', 'BusinessController@logout');
  Route::post('register', 'BusinessController@register'); //isletme kayit icin post edilecek yer
  Route::post('data', 'BusinessController@businessData');

  //data controller
  Route::post("staff/list", 'ResponseDataController@staffList');
  Route::post("experience/list", 'ResponseDataController@experienceList');
  Route::post("kiosk/list", 'ResponseDataController@kioskList');
  Route::post("location/minWage", 'ResponseDataController@getBusinessLocationMinWage');

  //kiosk islemleri bu kisim istekleri  sadece  kiosk requestleri icin dir
  Route::post('kiosk/code/generate', 'KioskController@generateId');
  Route::post('kiosk/add', 'KioskController@AddNewKiosk');

  Route::get('kiosk/qr/generate', 'KioskController@generateQr');
});

