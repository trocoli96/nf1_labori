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

        if(!empty($userRecord)){
            return redirect()->action(
                'ObjectController@returnUser', ['id' => $idGetter]);

        }else{
            return $errors[0];
        }

    }
}
