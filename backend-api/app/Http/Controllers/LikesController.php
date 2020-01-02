<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Post;
use App\Like;
use App\User;

class LikesController extends Controller
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

    public function updateLike(Request $request) {

        $data = $request->all();

        // primero nos aseguramos de que haya un ID válido
        if (empty($data['token']) || empty($data['post_id'])) {
            return abort(400, "UserId or PostId is empty");
        }

        // luego nos aseguramos que el id a partir del token exista, y que el postId exista
        $userId = Auth::id();
        $userIdDoesExist = User::find($userId);
        $postIdDoesExist = Post::find($data['post_id']);

        if ($userIdDoesExist === null || $postIdDoesExist === null) {
            return abort(400, "Either userId or postId doesn't exist");
        }

        // TODO: buscamos si la combinación user + post ya existe, y entonces borramos la fila
        $likeAlreadyExists = DB::table('likes')->where('user_id', $userId)->where('post_id', $data['post_id'])->get();

        if ($likeAlreadyExists !== null) {
            //$likeAlreadyExists->delete();
            return response("Like deleted");
        }

        // si no existe, añadimos fila
        $newLike = Like::create([
            'user_id' => $userId,
            'post_id' => $data['post_id'],
        ]);

        $newLike->save();

        return response("Like added succesfully", 200);

    }
}
