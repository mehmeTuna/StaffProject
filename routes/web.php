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

Route::post('/business/register', 'BusinessController@register'); //isletme kayit icin post edilecek yer

Route::post('/business/data', 'BusinessController@businessData');

Route::get("/{businessUsername}", 'BusinessController@home'); //isletme ana sayfasi

Route::post("/{businessUsername}/experience/create", 'ExperienceController@register');//experince ekleme kismi pot ile data yollanacak
Route::post("/{businessUsername}/staff/create", 'StaffController@register');//staff ekleme kismi pot ile data yollanacak

Route::get("/{businessUsername}/{operation}", 'BusinessController@home');

Route::get("/{businessUsername}/{operation}/{type}", 'BusinessController@home');

//data controller
Route::post("/business/staff/list", 'ResponseDataController@staffList');
Route::post("/business/experience/list", 'ResponseDataController@experienceList');
Route::post("/business/location/minWage", 'ResponseDataController@getBusinessLocationMinWage');



//varsayılan kayıt sayfasına gider
Route::get('/home', 'WelcomeController@index');
Route::get('/', 'WelcomeController@index');
