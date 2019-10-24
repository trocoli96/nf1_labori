<?php


namespace App\Http\Controllers;


class ObjectController extends Controller
{
    public function returnUser($id) {
        $user = array(
            "id" => $id,
            "name" => "Juan",
            "email" => 'juan@test.com'
        );
        return $user ;
    }
    public function returnUsers() {
        $user1 = array(
            "id" => 0,
            "name" => "Juan",
            "email" => 'juan@test.com'
        );
        $user2 = array(
            "id" => 1,
            "name" => "Juan",
            "email" => 'juan@test.com'
        );
        $user3 = array(
            "id" => 2,
            "name" => "Juan",
            "email" => 'juan@test.com'
        );
        return [$user1, $user2, $user3] ;
    }
}
