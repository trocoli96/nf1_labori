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

Route::get('users/{id}', 'Auth\ObjectController@returnUser');
Route::post('/user', 'UserController@createUser');
Route::put('users/{id}', 'ObjectController@returnUser');
Route::post('/login', 'LoginController@login');
Route::post('/editprofile', 'Auth\EditController@editUser');

Route::get('experiences/{id}', 'ObjectController@returnExperiencies');
Route::post('experience/', 'ObjectController@returnExperiencies');
Route::put('experience/{id}', 'ObjectController@returnExperiencies');

Route::get('educations/{id}', 'ObjectController@returnEducation');
Route::post('education', 'ObjectController@createEducation');
Route::put('educations/{id}', 'ObjectController@returnEducations');

Route::get('lincenses/{id}', 'ObjectController@returnLicense');
Route::post('lincense', 'ObjectController@returnLicense');
Route::put('licenses/{id}', 'ObjectController@returnLicense');
