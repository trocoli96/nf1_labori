<?php


namespace App\Http\Controllers;


use App\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'createUser']]);
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

        return  $this->login($request);
    }

    public function login(Request $request)
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);

    }
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
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
