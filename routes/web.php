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

Route::post('/business/register', 'BusinessController@register');

Route::post('/business/data', 'BusinessController@businessData');

Route::get("/{businessUsername}", 'BusinessController@home');

Route::post("/{businessUsername}/experience/create", 'ExperienceController@register');

Route::get("/{businessUsername}/{operation}", 'BusinessController@home');

Route::get("/{businessUsername}/{operation}/{type}", 'BusinessController@home');

//data controller
Route::post("/business/staff/list", 'ResponseDataController@getBusinessStaffList');
Route::post("/business/location/minWage", 'ResponseDataController@getBusinessLocationMinWage');



//development ortamında varsayılan kayıt sayfasına gider
Route::get('/home', 'WelcomeController@index');
Route::get('/', 'WelcomeController@index');
