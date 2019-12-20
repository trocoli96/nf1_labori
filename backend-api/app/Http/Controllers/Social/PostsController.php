<?php


namespace App\Http\Controllers\Social;

use App\Post;
use Illuminate\Http\Request;


class PostsController
{
    public function createPost (Request $request)
    {
        $post = Post::create([
            'user_id' => $request['user_id'],
            'post_text' => $request['post_text'],
            'image_link' => $request['image_link'],
        ]);
        return  $post;
    }
}
