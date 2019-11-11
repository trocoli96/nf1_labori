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

Route::get('users/{id}', 'ObjectController@returnUser');
Route::post('/user', 'UserController@createUser');
Route::put('users/{id}', 'ObjectController@returnUser');

Route::get('experiences/{id}', 'ObjectController@returnExperiencie');
Route::post('experience/', 'ObjectController@returnExperiencie');
Route::put('experience/{id}', 'ObjectController@returnExperiencie');

Route::get('educations/{id}', 'ObjectController@returnEducation');
Route::post('education', 'ObjectController@createEducation');
Route::put('educations/{id}', 'ObjectController@returnEducations');

Route::get('lincenses/{id}', 'ObjectController@returnLicense');
Route::post('lincense', 'ObjectController@returnLicense');
Route::put('licenses/{id}', 'ObjectController@returnLicense');
