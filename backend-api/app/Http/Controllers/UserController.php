<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class UserController extends Controller
{
    public function createUser(Request $request)
    {
        $inputData = $request->all();
        $userEmail = $request->only('email');


        $query = User::where("email","=",$userEmail)->first();

        If (!empty($query)) return $error="UserExist";

        else $user = User::create([
            'first_name' => $inputData['first_name'],
            'last_name' => $inputData['last_name'],
            'email' => $inputData['email'],
            'password' => $inputData['password'],
            'former_name' => $inputData['former_name'],
            'headline' => $inputData['headline'],
        ]);

        return $user;
    }
}
