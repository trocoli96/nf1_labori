<?php


namespace App\Http\Controllers;


use App\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login' ,'createUser']]);
    }

    public function createUser(Request $request)
    {
        $inputData = $request->all();

        $userValidator = Validator::make($inputData, [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:user'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        if(!$userValidator->validate()) {
            $errors = $userValidator->errors()->getMessages();
            return $this->errorResponse($errors, Response::HTTP_UNPROCESSABLE_ENTITY);
        }


        $user = User::create([
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
     * @param  array  $data
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
        $errors = array("User not found");
        $input = $request->all();

        $userEmail = $request->only(['email']);
        $userPass = $request->only(['password']);

        $userRecord = User::where("email","=",$userEmail)
            ->where("password","=",$userPass)
            ->first();

        $idGetter = $userRecord['id'];

        if(!empty($userRecord)){
            return redirect()->action(
                'AuthController@returnUser', ['id' => $idGetter]);

        }else{
            return $errors[0];
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

}
