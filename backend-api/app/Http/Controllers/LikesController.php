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
            // TODO return a response
            return abort(400, "Parameter {id} is empty.");
        }

        // luego nos aseguramos que el post existe
        if (Post::find($id) === null) {
            // TODO return a response
            return abort(400, "That postId doesn't exist.");
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
            // TODO return a response
            return abort(400, "PostId is empty");
        }

        // luego nos aseguramos que el id a partir del token exista, y que el postId exista
        $postIdDoesExist = Post::find($data['post_id']);

        if ($postIdDoesExist === null) {
            // TODO return a response
            return abort(400, "postId doesn't exist");
        }

        $userId = Auth::id();

        // buscamos si la combinación user + post ya existe, y entonces borramos la fila
        $likeAlreadyExists = DB::table('likes')->where('user_id', $userId)->where('post_id', $data['post_id'])->get();

        if (!($likeAlreadyExists->isEmpty())) {
            // primero borramos en MySQL
            $rowToDelete = DB::table('likes')->where('user_id', $userId)->where('post_id', $data['post_id']);
            $rowToDelete->delete();

            // luego decrementamos en Redis
            $postLikeCounter = Redis::decr("like_counter_" . $data['post_id']);
            return response("Like deleted succesfully: \n" . $likeAlreadyExists);
        }

        // si no existe, añadimos fila en MySQL
        $newLike = Like::create([
            'user_id' => $userId,
            'post_id' => $data['post_id'],
        ]);

        $newLike->save();

        // e incrementamos también en Redis
        $postLikeCounter = Redis::incr("like_counter_" . $data['post_id']);

        return response()->json($newLike, 200);

        // TODO: AÑADIR TAMBIÉN EL REGISTRO DEL LIKE/UNLIKE EN LA TABLA DE EVENTOS

    }
}
