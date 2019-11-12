<?php


namespace App\Http\Controllers\Auth;


class ObjectController
{
    public function returnUser ($id) {
        $user = array(
            "id" => $id,
            "name" => "Juan",
            "email" => "juan€test.com"
        );
        return $user;
    }
}
