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
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('users/', 'AuthController@me');
Route::post('/user', 'AuthController@createUser');
Route::post('/edituser', 'AuthController@editUser');
Route::post('/login', 'AuthController@login');

Route::post('/post', 'PostsController@createPost');

Route::get('experience/{id}', 'ExperienceController@showExperience');
Route::post('/experience', 'ExperienceController@createExperience');
Route::put('experience/{id}', 'ExperienceController@modifyExperience');

Route::get('educations/{id}', 'ObjectController@returnEducation');
Route::post('education', 'ObjectController@createEducation');
Route::put('educations/{id}', 'ObjectController@returnEducations');

Route::get('licenses/{id}', 'ObjectController@returnLicense');
Route::post('license', 'ObjectController@returnLicense');
Route::put('licenses/{id}', 'ObjectController@returnLicense');

Route::get('likes/{id}', 'LikesController@getLikesFromPost');
Route::post('like', 'LikesController@updateLike');




