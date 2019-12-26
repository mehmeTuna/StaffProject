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

Route::get('/business/register', 'BusinessController@registerPage');

Route::post('/business/register', 'BusinessController@register');

Route::post('/business/admin', 'BusinessController@businessData');

Route::get("/{businessUsername}", 'BusinessController@home');

Route::get("/{businessUsername}/{operation}", 'BusinessController@home');

Route::get("/{businessUsername}/{operation}/{type}", 'BusinessController@home');


//development ortamında varsayılan kayıt sayfasına gider
Route::get('/', 'WelcomeController@index');
