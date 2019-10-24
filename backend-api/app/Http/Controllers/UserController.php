<?php


namespace App\Http\Controllers;


class UserController extends Controller
{
    public function getuser($id){
        return $id;
    }
    public function returnUsers() {
        $user0 = array (
            "id" => 1,
            "nombre" => "Juan",
            "email" => "juan@gmail.com"

        );
        $user1 = array (
            "id" => 2,
            "nombre" => "Juan",
            "email" => "juan@gmail.com"

        );
        return [$user0,$user1];
    }
}
