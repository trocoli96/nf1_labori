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

Route::get('user/', 'AuthController@me');
Route::get('user/{id}', 'AuthController@getUserById');

Route::post('/user', 'AuthController@createUser');
Route::put('/edituser', 'AuthController@editUser');
Route::post('/login', 'AuthController@login');
Route::put('/profilepicture', 'AuthController@updateProfilePic');

Route::post('/post', 'PostsController@createPost');
Route::get('/posts/', 'PostsController@returnPosts');
Route::get('/post/{id}', 'PostsController@returnPost');
Route::put('/editpost/{id}', 'PostsController@editPost');
Route::delete('/post/delete/{id}', 'PostsController@deletePost');

Route::get('/experiences', 'ExperienceController@showExperiences');
Route::get('/experiences/{id}', 'ExperienceController@showExperiencesById');
Route::post('/experience', 'ExperienceController@createExperience');
Route::put('experience/{id}', 'ExperienceController@modifyExperience');
Route::delete('experience/delete', 'ExperienceController@deleteExperience');

Route::get('likes/{id}', 'LikesController@getLikesFromPost');
Route::post('like', 'LikesController@updateLike');

Route::get('comment/{id}', 'CommentsController@showComments');
Route::post('/comments', 'CommentsController@createComments');
Route::get('/comments/{post_id}', 'CommentsController@returnComments');

Route::put('comment/{id}', 'Comments@modifyComments');

Route::post('/follow/{following_id}', 'FriendsController@follow');
Route::delete('/unfollow/{followed_id}', 'FriendsController@unfollow');
Route::get('/followers/{id}', 'FriendsController@returnFollowers');
Route::get('/followings/{id}', 'FriendsController@returnFollowings');





