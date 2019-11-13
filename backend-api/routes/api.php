<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/api/users/{id}', 'Auth\ObjectController@returnUser');
Route::post('/api/user', 'UserController@createUser');
Route::put('/api/users/{id}', 'ObjectController@returnUser');
Route::post('/api/login', 'LoginController@login');
Route::post('/api/editprofile', 'Auth\EditController@editUser');

Route::get('/api/experiences/{id}', 'ObjectController@returnExperiencies');
Route::post('/api/experience/', 'ObjectController@returnExperiencies');
Route::put('/api/experience/{id}', 'ObjectController@returnExperiencies');

Route::get('/api/educations/{id}', 'ObjectController@returnEducation');
Route::post('/api/education', 'ObjectController@createEducation');
Route::put('/api/educations/{id}', 'ObjectController@returnEducations');

Route::get('/api/lincenses/{id}', 'ObjectController@returnLicense');
Route::post('/api/lincense', 'ObjectController@returnLicense');
Route::put('/api/licenses/{id}', 'ObjectController@returnLicense');
