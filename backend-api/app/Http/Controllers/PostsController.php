<?php


namespace App\Http\Controllers;

use App\Post;
use App\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;


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

    public function returnPosts(Request $request, $length)
    {

        $posts = Post::select(
            'posts.id',
            'posts.user_id',
            'posts.post_text',
            'posts.created_at',
            'posts.updated_at',
            'posts.image_link',
            'user.shortname',
            'user.first_name',
            'user.last_name',
            'user.former_name'
        )
            ->from('posts')
            ->join('user', function($query)
            {
                $query->on('user.id', '=', 'posts.user_id');
            }
                )
            ->orderBy('created_at', 'desc')
            ->paginate($length);

        return $posts;
    }
    public function returnPost(Request $request, $id)
    {
        $userId = Auth::id();
        $userIdDoesExist = User::find($userId);

        if ($userIdDoesExist === null) {
            // TODO return a response
            return abort(400, "User doesn't exist");
        }
        // primero nos aseguramos que hay un parámetro en la URL
        if (empty($id)) {
            // TODO return a response
            return abort(400, "Parameter {id} is empty.");
        }

        // luego nos aseguramos que el post existe
        if (Post::find($id) === null) {
            // TODO return a response
            return abort(400, "That postId doesn't exist.");
        }

        // y luego devolvemos el post
        $post = DB::table('posts')->where('id', $id)->first();

        return response()->json($post);
    }

}

