<?php


namespace App\Http\Controllers;
use App\Comments;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;


class CommentsController extends Controller
{
    public function createComments(Request $request)
    {
        $request = $request->all();

        $comment = comments::create([
            'comment_body' => $request['comment_body'],
            'author_id' => ($request['author_id']),
            'post_id' => $request['post_id'],
        ]);

        return $comment;
    }

public function returnComments (Request $request, $post_id)
    {
        //TODO revisar como evitar el pagination
        $request = $request->all();
        $lenght = 5;

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
            'posts.image_link'
        )
            ->where('posts.id', '=', $post_id)
            ->from('comments')
            ->join('posts', function($query)
            {
                $query->on('comments.post_id', '=', 'posts.id');
            }
            )
            ->orderBy('created_at', 'desc')
            ->paginate($lenght);

        return $comments;
    }

   public function modifyComments(Request $request)
    {
        $errorComments = array("Comments doesn't exist");
        $data = $request->all();
        if (Comments::find($data['id']) === null) {
            return $errorComments;
        }
        else {
            $data = Comments::find($request->id);

            $data->body = $request->body;

            $data->save();

            $CommentsRecord = Comments::where("id", "=", $data['id'])
                ->first();
        }

        return response()->json($CommentsRecord, 200);
    }
};
