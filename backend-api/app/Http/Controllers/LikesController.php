<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use Illuminate\Support\Facades\DB;


class LikesController
{
    public function getLikesFromPost(Request $request, $id) {

        // primero nos aseguramos que hay un parámetro en la URL
        if (empty($id)) {
            return abort(400, "Parameter {id} is empty.");
        }

        // luego nos aseguramos que el post existe
        if (Post::find($id) === null) {
            return abort(400, "That postId doesn't exist.");
        }

        // y luego devolvemos el array
         $likesFromPost = DB::table('likes')->where("post_id", "=", $id)->get();

        return response()->json($likesFromPost);

    }
}
