<?php


namespace App\Http\Controllers;

use App\Comments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;


class CommentsController extends Controller
{


    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['returnComments', 'modifyComments']]);
    }


    public function returnComments(Request $request, $post_id)
    {
        //TODO revisar como evitar el pagination
        $request = $request->all();

        $comments = Comments::select(
            'comments.id',
            'comments.author_id',
            'comments.post_id',
            'comments.comment_body',
            'comments.created_at',
            'comments.updated_at',
            'posts.id',
            'posts.user_id',
            'posts.post_text',
            'posts.image_link',
            'user.first_name',
            'user.last_name'
        )
            ->where('posts.id', '=', $post_id)
            ->from('comments')
            ->join('posts', function ($query) {
                $query->on('comments.post_id', '=', 'posts.id');
            })
            ->join('user', function ($query) {
                $query->on('user.id', '=', 'comments.author_id');
            })
            ->orderBy('created_at', 'desc')
            ->get();

        return $comments;
    }

    public function createComments(Request $request)
    {
        $data = $request->all();
        $userId = Auth::id();

        $comment = comments::create([
            'comment_body' => $data['comment_body'],
            'author_id' => ($userId),
            'post_id' => $data['post_id'],
        ]);

        // devolvemos todos los comentarios de ese post
        $allCommentsFromThatPost = $this->returnComments($request, $request['post_id']);

        return response()->json($allCommentsFromThatPost, 200);
    }

    public function modifyComments(Request $request)
    {
        $errorComments = array("Comments doesn't exist");
        $data = $request->all();
        if (Comments::find($data['id']) === null) {
            return $errorComments;
        } else {
            $data = Comments::find($request->id);

            $data->body = $request->body;

            $data->save();

            $CommentsRecord = Comments::where("id", "=", $data['id'])
                ->first();
        }

        return response()->json($CommentsRecord, 200);
    }
}

;
