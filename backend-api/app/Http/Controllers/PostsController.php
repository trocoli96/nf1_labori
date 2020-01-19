<?php


namespace App\Http\Controllers;

use App\Post;
use App\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

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
            'user.former_name',
            'user.color'
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
            return response()->json(['message' => "User doesn't exist"],400);
        }
        // primero nos aseguramos que hay un parámetro en la URL
        if (empty($id)) {
            return response()->json(['message' => "ID is empty"],400);
        }

        // luego nos aseguramos que el post existe
        if (Post::find($id) === null) {
            return response()->json(['message' => "Post id doesn't exist"],400);
        }

        // y luego devolvemos el post

        $post = DB::table('posts')
            ->leftJoin('user', 'posts.user_id', '=', 'user.id')
            ->where('posts.id', $id)
            ->first();

        return response()->json($post);
    }
    public function editPost(Request $request, $id)
    {
        $postData = $request->all();
        $userId = Auth::id();
        $userinfo = User::findOrFail($userId);
        $newPostData = Post::find($id);

        if ($userinfo === null) {
            return response()->json(['message' => "User doesn't exist"],400);
        }
        // primero nos aseguramos que hay un parámetro en la URL
        if (empty($id)) {
            return response()->json(['message' => "ID is empty"],400);
        }
        if ($newPostData['user_id'] !== $userId){
            return response()->json(['message' => "You're not the author of this post"],400);
        }

        if (!empty($postData['post_text'])){
            $newPostData['post_text'] = $postData['post_text'];
        }

        $newPostData->save();

        return response()->json($newPostData, 200);

    }

}

