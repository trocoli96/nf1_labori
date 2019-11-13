<?php


namespace App\Http\Controllers\Auth;


use App\User;

class ObjectController
{
    public function returnUser ($id) {
        $userRecord = User::where("id","=",$id)
            ->first();

        $emailGetter = $userRecord['email'];
        $firstnameGetter = $userRecord['first_name'];
        $lastnameGetter = $userRecord['last_name'];

        return "Bienvenido a la web de Labori $firstnameGetter $lastnameGetter. Aqui podrás encontrar trabajo fácilmente. Mira tu bandeja de entrada en $emailGetter para estar al día de tus notificaciones";

    }
}
