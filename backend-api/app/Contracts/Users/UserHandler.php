<?php


namespace App\Contracts\Users;


use App\User;

interface UserHandler
{
    public function updateUserPicture(User $user, $imageUrl) : User;

}
