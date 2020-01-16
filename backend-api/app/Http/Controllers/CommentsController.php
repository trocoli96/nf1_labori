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
        $createComments = "";

        $createComments <= Comments::create([
            'Body' => $request['comment_body'],
            'Date' => ($request['created_at']),
            'user_id' => ($request['user_id']),
            'id' => ($request['id'])
        ]);

        return $createComments;
    }

    public function showComments($id)
    {
        $error = 'Experience not found';

        $CommentsId = Experience::where('id',"=",$id)
            ->first();
        $CommentsInfo = array($CommentsId['id'],
            'Body' => $request['comment_body'],
            'Date' => $request['created_at'],
            'user_id' => ($request['user_id']),
            'id' => ($request['id'])
        );
            if(!empty($CommentsId)){
                return $CommentsInfo;
            }
            else{
                return $error;
            }
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
