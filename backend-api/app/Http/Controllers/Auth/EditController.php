<?php


namespace App\Http\Controllers\Auth;

use App\User;
use Illuminate\Http\Request;

class EditController
{
    public function editUser(Request $request)
    {

        $errorone = array('usuario no existe');

        $data = $request->all();
            if (User::find($data['id']) === null) {
                return $errorone;
            } else {
                $olduserRecord = User::where("id", "=", $data['id'])
                    ->first();
                $oldnameGetter = $olduserRecord['first_name'];

                $data = User::find($request->id);
                $data->first_name = $request->first_name;
                $data->email = $request->email;
                $data->save();


                $userRecord = User::where("id", "=", $data['id'])
                    ->first();
                $emailGetter = $userRecord['email'];
                $firstnameGetter = $userRecord['first_name'];

                return "Genial, ya nunca más serás $oldnameGetter , ahora eres $firstnameGetter y tu mail ahora es $emailGetter";
            }
        }

}
