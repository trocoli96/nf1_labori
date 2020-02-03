<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;
use App\Post;
use App\Like;
use App\User;

class LikesController extends Controller
{

    public function getLikesFromPost(Request $request, $id)
    {

        // primero nos aseguramos que hay un parámetro en la URL
        if (empty($id)) {
            return response()->json("Parameter {id} is empty.", 400);
        }

        // luego nos aseguramos que el post existe
        if (Post::find($id) === null) {
            return response()->json("That postId doesn't exist.", 400);
        }

        // y luego devolvemos el array
        $likesFromPost = Redis::get("like_counter_" . $id);

        return response()->json($likesFromPost);

    }

    public function updateLike(Request $request)
    {
        $data = $request->all();

        // primero nos aseguramos de que haya un ID válido
        if (empty($data['post_id'])) {
            return response()->json("PostId is empty.", 400);
        }

        // luego nos aseguramos que el id a partir del token exista, y que el postId exista
        $postIdDoesExist = Post::find($data['post_id']);

        if ($postIdDoesExist === null) {
            return response()->json("That postId doesn't exist.", 400);
        }

        $userId = Auth::id();

        // buscamos si la combinación user + post ya existe, y entonces borramos la fila
        $likeAlreadyExists = DB::table('likes')->where('user_id', $userId)->where('post_id', $data['post_id'])->get();


        if (!($likeAlreadyExists->isEmpty())) {
            // si existe, borramos like

            // primero borramos en MySQL
            $rowToDelete = DB::table('likes')->where('user_id', $userId)->where('post_id', $data['post_id']);
            $rowToDelete->delete();

            // luego decrementamos en Redis
            $postLikeCounter = Redis::decr("like_counter_" . $data['post_id']);

            // y anotaremos en la respuesta que ese post no está likeado
            $liked = false;

        } else {
            // si no existe, añadimos fila en MySQL
            $newLike = Like::create([
                'user_id' => $userId,
                'post_id' => $data['post_id'],
            ]);

            $newLike->save();

            // e incrementamos también en Redis
            $postLikeCounter = Redis::incr("like_counter_" . $data['post_id']);

            // y anotaremos en la respuesta que ese post no está likeado
            $liked = true;
        }

        // devolvemos el post en cuestión, añadiéndole los likes
        $postToReturn = Post::where('id', $data['post_id'])
            ->first();
        $likesFromThatPost = Redis::get("like_counter_" . $data['post_id']);

        $postToReturn['likes'] = (int)$likesFromThatPost;
        $postToReturn['liked'] = $liked;

        return response()->json($postToReturn, 200);

    }
}
