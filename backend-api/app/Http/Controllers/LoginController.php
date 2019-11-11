<?php


namespace App\Http\Controllers;

use App\Email;
use Illuminate\Http\Request;


class LoginController
{
    public function login(Request $request)
    {
        $request->validate([
            'email'       => 'required|string|email',
            'password'    => 'required|string',
        ]);
        return "Benvenuti";

        //encontrar el primer email que encuentre y devolver un ok

    }
}
