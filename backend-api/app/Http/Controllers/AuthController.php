<?php


namespace App\Http\Controllers;


use App\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function createUser(Request $request)
    {
        $inputData = $request->all();
        $userEmail = $request->only('email');


        $query = User::where("email", "=", $userEmail)->first();

        If (!empty($query)) return $error = (["UserExist"]);

        else $user = User::create([
            'first_name' => $inputData['first_name'],
            'last_name' => $inputData['last_name'],
            'email' => $inputData['email'],
            'password' => bcrypt($inputData['password']),
        ]);

        return $user;
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param array $data
     * @return \App\User
     */
   protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }

    public function login(Request $request)
    {
        $errors = (["User not found"]);
        $errorpass = (["Incorrect pass motherfucker"]);
        $input = $request->all();

        $userEmail = $request->only(['email']);
        $userRecord = User::where("email", "=", $userEmail)
            ->first();
        $idGetter = $userRecord['id'];
        $passGetter = $userRecord['password'];

      if (empty($userRecord)) {
           return $errors;
       }
            elseif (Hash::check($input['password'],$passGetter)) {
               return $this ->respondWithToken($userRecord);
               }
                    else {
                       return $errorpass;
                   }

}
    public function returnUser ($id) {
        $userRecord = User::where("id","=",$id)
            ->first();

        $emailGetter = $userRecord['email'];
        $firstnameGetter = $userRecord['first_name'];
        $lastnameGetter = $userRecord['last_name'];

        return [$emailGetter, $firstnameGetter, $lastnameGetter];

    }
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

            if ($olduserRecord['first_name'] === $data['first_name'])

                return $error = ["Username is the same as previous"];

            else {

                return [$oldnameGetter, $emailGetter, $firstnameGetter];
            }
        }
    }
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

}
