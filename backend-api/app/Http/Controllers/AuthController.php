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
        $permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyz';

        $random = substr(str_shuffle($permitted_chars), 0, 6);
        $color = str_split($random);

        $inputData = $request->all();
        $userValidator = Validator::make($inputData, [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:user'],
            'password' => ['required', 'string', 'min:8'],
        ]);
        if (!$userValidator->validate()) {
            $errors = $userValidator->errors()->getMessages();
            return $this->errorResponse($errors, Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        $user = User::create([
            'first_name' => $inputData['first_name'],
            'last_name' => $inputData['last_name'],
            'former_name' => $inputData['former_name'],
            'headline' => $inputData['headline'],
            'email' => $inputData['email'],
            'password' => bcrypt($inputData['password']),
            'color' => '#'.$random,
            'shortname' => substr($inputData['first_name'], 0,1).substr($inputData['last_name'],0,1),
        ]);
        return $this->login($request);
    }

    public function login(Request $request)
    {
        $credentials = request(['email', 'password']);
        if (!$token = auth()->attempt($credentials)) {
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
        $data = $request->all();

        User::findOrFail($data['id']);

        $olduserRecord = User::where("id", "=", $data['id'])
            ->first();
        $oldnameGetter = $olduserRecord['first_name'];

        $data = User::find($request->id);
        $data->first_name = $request->first_name;
        $data->email = $request->email;
        $data->former_name = $request->former_name;
        $data->headline = $request->headline;


        $data->save();

        $userRecord = User::where("id", "=", $data['id'])
            ->first();

        $emailGetter = $userRecord['email'];
        $firstnameGetter = $userRecord['first_name'];

        if ($olduserRecord['first_name'] === $data['first_name'])
            return response()->json(["error" => "Username is the same as previous"], 400);
        else {
            return response()->json([$oldnameGetter, $emailGetter, $firstnameGetter], 200);
        }
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 1
        ]);
    }
}
