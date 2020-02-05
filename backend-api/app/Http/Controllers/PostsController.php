<?php


namespace App\Http\Controllers;

use App\Friend;
use App\Post;
use App\User;
use App\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;

class PostsController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }


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

    public function returnPosts(Request $request)
    {
        $userId = Auth::id();

        $followings = Friend::select(
            'friends.id',
            'friends.user_id',
            'friends.is_following'
        )
            ->from('friends')
            ->where('friends.user_id', '=', $userId)
            ->join('user', function ($query) {
                $query->on('user.id', '=', 'friends.is_following');
            }
            )
            ->get();

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
            ->join('user', function ($query) {
                $query->on('user.id', '=', 'posts.user_id');
            })
            ->orderBy('created_at', 'desc')
            ->paginate(5);


        foreach ($posts as $post) {

            $userId = Auth::id();

            $post['owner'] = Auth::id() === $post['user_id'];

            // sumarle likes
            $likesFromPost = Redis::get("like_counter_" . $post['id']);
            $post['likes'] = (int)$likesFromPost;

            // ver si el post está likeado por nosotros
            $likedByMe = Like::where('user_id', $userId)
                ->where('post_id', $post->id)
                ->get();
            $post['liked'] = !$likedByMe->isEmpty();

            // ver si el post tiene comments
            $comments = DB::table('comments')
                ->leftJoin('user', 'comments.author_id', '=', 'user.id')
                ->where('post_id', '=', $post['id'])
                ->orderBy('comments.created_at', 'desc')
                ->get();
            // TODO paginar los comments
            // añadirlos en par clave-valor
            $post['comments'] = $comments;

        }

        return response()->json($posts, 200);
    }

    public function returnPost(Request $request, $id)
    {
        // primero nos aseguramos que hay un parámetro en la URL
        if (empty($id)) {
            return response()->json(['message' => "ID is empty"], 400);
        }

        // luego nos aseguramos que el post existe
        if (Post::find($id) === null) {
            return response()->json(['message' => "Post id doesn't exist"], 400);
        }

        // y luego devolvemos el post
        $post = (array)DB::table('posts')
            ->join('user', 'posts.user_id', '=', 'user.id')
            ->select(
                'posts.id',
                'posts.user_id',
                'posts.post_text',
                'posts.created_at',
                'posts.updated_at',
                'posts.image_link',
                'user.first_name',
                'user.last_name',
                'user.former_name',
                'user.shortname',
                'user.color',
                'user.profile_photo'
            )
            ->where('posts.id', $id)
            ->first();

        // para añadirle si somos owner
        $userId = Auth::id();
        $post['owner'] = $userId === $post['user_id'];

        // sumarle likes
        $likesFromPost = Redis::get("like_counter_" . $id);
        $post['likes'] = (int)$likesFromPost;

        // ver si el post está likeado por nosotros
        $likedByMe = Like::where('user_id', $userId)
            ->where('post_id', $id)
            ->get();
        $post['liked'] = !$likedByMe->isEmpty();

        // ver si el post tiene comments
        $comments = DB::table('comments')
            ->leftJoin('user', 'comments.author_id', '=', 'user.id')
            ->where('comments.post_id', '=', $id)
            ->orderBy('comments.created_at', 'desc')
            ->get();
        // añadirlos en par clave-valor
        $post['comments'] = $comments;


        return response()->json($post, 200);
    }

    public function editPost(Request $request, $id)
    {
        $postData = $request->all();
        $userId = Auth::id();
        $userinfo = User::findOrFail($userId);
        $newPostData = Post::find($id);

        if ($userinfo === null) {
            return response()->json(['message' => "User doesn't exist"], 400);
        }
        // primero nos aseguramos que hay un parámetro en la URL
        if (empty($id)) {
            return response()->json(['message' => "ID is empty"], 400);
        }
        if ($newPostData['user_id'] !== $userId) {
            return response()->json(['message' => "You're not the author of this post"], 400);
        }

        if (!empty($postData['post_text'])) {
            $newPostData['post_text'] = $postData['post_text'];
        }

        $newPostData->save();

        return response()->json($newPostData, 200);

    }

    public function deletePost(Request $request, $id)
    {

        $data = $request->all();

        $userId = Auth::id();
        $post = Post::find($id);

        // comprobamos que user_id del post corresponda con el user.id
        if ($userId !== $post['user_id']) {
            return response()->json("Permission denied.", 403);
        }


        $post->delete();

        return response()->json(["Succesfully deleted", $post], 200);

    }


}

