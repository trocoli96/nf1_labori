<?php


namespace App\Http\Controllers;

use App\Post;
use App\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class PostsController extends Controller
{


    public function createPost(Request $request)
    {

        $data = $request->all();

        // nos aseguramos que el id a partir del token exista
        $userId = Auth::id();
        $userIdDoesExist = User::find($userId);

        if ($userIdDoesExist === null) {
            return abort(400, "User doesn't exist");
        }

        {
            $post = Post::create([
                'user_id' => $userId,
                'post_text' => $request['post_text'],
                'image_link' => $request['image_link'],
            ]);
            return $post;
        }
    }
}
