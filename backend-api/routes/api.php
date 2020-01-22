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
Route::get('user/', 'AuthController@me');//ruta para ver usuario cuando sean amigos

Route::post('/user', 'AuthController@createUser');
Route::put('/edituser', 'AuthController@editUser');
Route::post('/login', 'AuthController@login');

Route::post('/post', 'PostsController@createPost');
Route::get('/posts/{posts}', 'PostsController@returnPosts');
Route::get('/post/{id}', 'PostsController@returnPost');
Route::put('/editpost/{id}', 'PostsController@editPost');

Route::get('/experiences', 'ExperienceController@showExperiences');
Route::post('/experience', 'ExperienceController@createExperience');
Route::put('experience/{id}', 'ExperienceController@modifyExperience');
Route::delete('experience/delete', 'ExperienceController@deleteExperience');

Route::get('likes/{id}', 'LikesController@getLikesFromPost');
Route::post('like', 'LikesController@updateLike');

Route::get('comment/{id}', 'CommentsController@showComments');
Route::post('/comments', 'CommentsController@createComments');
Route::get('/comments/{post_id}', 'CommentsController@returnComments');

Route::put('comment/{id}', 'Comments@modifyComments');



