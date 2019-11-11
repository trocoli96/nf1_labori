<?php


namespace App\Http\Controllers;

use App\Email;
use Illuminate\Http\Request;
use Illuminate\Http


class LoginController extends Controller
{
    public function login(Request $request)
    {
        $this->validate($request,[
            'email'       => 'bail|required|string|email',
            'password'    => 'bail|required|string',
        ]);
        return "Benvenuti";

        //encontrar el primer email que encuentre y devolver un ok

    }
}
