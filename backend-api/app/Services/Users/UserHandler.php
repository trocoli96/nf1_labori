<?php


namespace App\Services\Users;

use App\Contracts\Users\UserHandler as Handler;
use App\User;

class UserHandler implements Handler
{

    public function updateUserPicture(User $user, $imageUrl): User
    {
        $user->profile_photo = $imageUrl;
        $user->save();

        return $user;
    }
}
