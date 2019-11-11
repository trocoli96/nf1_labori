<?php


namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;


class LoginController
{
    public function login(Request $request)
    {
        $errors = array("User not found");
        $input = $request->all();

        $userEmail = $request->only(['email']);
        $userPass = $request->only(['password']);

        $userRecord = User::where("email","=",$userEmail)
            ->where("password","=",$userPass)
            ->first();

        $idGetter = $userRecord['id'];
        $nameGetter = $userRecord['first_name'];

        $comprovationMsgLogIn = array("You've been Logged. 
                                    Nice to see ya again $idGetter");
        if(!empty($userRecord)){
            return $comprovationMsgLogIn[0] . $nameGetter;
        }
        else{
            return $errors[0];
        }

    }
}
