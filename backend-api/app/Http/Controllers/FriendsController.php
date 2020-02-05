<?php


namespace App\Http\Controllers;

use App\Friend;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class FriendsController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function follow(Request $request, $following_id){

        // nos aseguramos que el id a partir del token exista
        $userId = Auth::id();
        $userIdDoesExist = User::find($userId);
        $followingIdDoesExist = User::find($following_id);

        $followalreadyexists = DB::table('friends')
            ->where('user_id', $userId)
            ->where('is_following', $following_id)
            ->get();

        if ($userIdDoesExist === null) {
            return response()->json(['message' => "User doesn't exist"], 400);
        }
        // nos aseguramos que el usuario a seguir existe
        if($followingIdDoesExist === null){
            return response()->json(['message' => "The user you want to follow doesn't exist"], 400);
        }
        // vemos si ya existe el follow
        if (!($followalreadyexists->isEmpty())) {
            return response()->json(['message' => "You're already following him"], 400);
        }
        //hacemos el follow
        $follow = Friend::create([
            'user_id' => $userId,
            'is_following' => $following_id,
        ]);

        return response ()->json($follow);
    }

    public function unfollow(Request $request, $followed_id){

        // nos aseguramos que el id a partir del token exista
        $userId = Auth::id();
        $userIdDoesExist = User::find($userId);
        $followingIdDoesExist = User::find($followed_id);

        $followId = DB::table('friends')
            ->where('user_id', $userId)
            ->where('is_following', $followed_id)
            ->get();

        if ($userIdDoesExist === null) {
            return response()->json(['message' => "User doesn't exist"], 400);
        }

        // nos aseguramos que el usuario a seguir existe
        if($followingIdDoesExist === null){
            return response ()->json(['message' => "The user you want to follow doesn't exist"], 400);
        }

        // vemos si existe el follow
        if ($followId->isEmpty()) {
            return response()->json(['message' => "You don't follow him"], 400);
        }

        //hacemos el unfollow
        $deletefollow = DB::table('friends')
            ->where('user_id', $userId)
            ->where('is_following', $followed_id)
            ->delete();

        return response()->json(['message' => "Succesfully deleted"], 200);
    }

    public function returnFollowers(Request $request, $id){

        // nos aseguramos que el id a partir del token exista
        $userId = Auth::id();
        $userIdDoesExist = User::find($userId);

        if ($userIdDoesExist === null) {
            return response()->json(['message' => "User doesn't exist"], 400);
        }

        //listamos las filas donde nuestro id aparece en la columna is_following y lo joineamos con la tabla user
        $followers = Friend::select(
            'friends.id',
            'friends.user_id',
            'friends.is_following'
,           'user.shortname',
            'user.first_name',
            'user.last_name',
            'user.former_name',
            'user.color'
        )
            ->from('friends')
            ->where('friends.is_following', '=', $id)
            ->join('user', function ($query) {
                $query->on('user.id', '=', 'friends.user_id');
            }
            )
            ->orderBy('friends.created_at', 'desc')
            ->paginate(10);

        return response()->json($followers,200);

    }

    public function returnFollowings(Request $request){

        // nos aseguramos que el id a partir del token exista
        $userId = Auth::id();
        $userIdDoesExist = User::find($userId);

        if ($userIdDoesExist === null) {
            return response()->json(['message' => "User doesn't exist"], 400);
        }

        //listamos las filas donde nuestro id aparece en la columna user_id y lo joineamos con la tabla user
        $followings = Friend::select(
            'friends.id',
            'friends.user_id',
            'friends.is_following',
            'user.shortname',
            'user.first_name',
            'user.last_name',
            'user.former_name',
            'user.color'
        )
            ->from('friends')
            ->where('friends.user_id', '=', $userId)
            ->join('user', function ($query) {
                $query->on('user.id', '=', 'friends.is_following');
            }
            )
            ->orderBy('friends.created_at', 'desc')
            ->paginate(10);

        return response()->json($followings,200);

    }

    public function peopleWhoMaybeYouKnow(){
        $userId = Auth::id();
        $peopleWhoMaybeYouKnow = array();
        $friends = Friend::select(
            'is_following'
        )
            ->where('user_id', '=', $userId)
            ->inRandomOrder()
            ->paginate(5);


        foreach ($friends as $friend){
            $possibleFriend = Friend::select(
                'is_following',
                'user.id',
                'user.shortname',
                'user.first_name',
                'user.last_name',
                'user.former_name',
                'user.color'
            )
                ->where('user_id', '=', $friend['is_following'])
                ->where('user_id', '!=', $userId)
                ->join('user', function ($query) {
                    $query->on('user.id', '=', 'friends.is_following');
                })
                ->first();

            if (isset($possibleFriend)) {
                $peopleWhoMaybeYouKnow[] = $possibleFriend;
            }
        }


        $possibleFriendsThatWeStillNeed = null;
        $numberOfPossibleFriendsThatWeStillNeed = (5 - sizeof($peopleWhoMaybeYouKnow));
        if($numberOfPossibleFriendsThatWeStillNeed > 0) {
            $possibleFriendsThatWeStillNeed = User::select(
                'user.id',
                'user.shortname',
                'user.first_name',
                'user.last_name',
                'user.former_name',
                'user.color')
                ->inRandomOrder()
                ->where('user.id', '!=', $userId)
                ->paginate($numberOfPossibleFriendsThatWeStillNeed);
        }
        return array_merge($possibleFriendsThatWeStillNeed->toArray()["data"], $peopleWhoMaybeYouKnow);
    }
}
