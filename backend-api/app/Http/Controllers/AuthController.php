<?php


namespace App\Http\Controllers;


use App\Contracts\Users\UserHandler;
use App\Http\Traits\CloudinaryTrait;
use App\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    use CloudinaryTrait;

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'createUser', 'getUserById']]);
    }

    public function createUser(Request $request)
    {
        $permitted_chars = '0123456789abcdef';

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
            'email' => $inputData['email'],
            'password' => bcrypt($inputData['password']),
            'color' => '#'.$random,
            'shortname' => strtoupper(substr($inputData['first_name'], 0,1).substr($inputData['last_name'],0,1)),
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

        // 1. conseguir el ID del usuario a partir del token
        $userId = Auth::id();

        // 2. crear el modelo de put en base a los datos que vienen por el request
        $newData = User::find($userId);

        if (!empty($data['first_name'])) {
            $newData['first_name'] = $data['first_name'];
        }

        if (!empty($data['last_name'])) {
            $newData['last_name'] = $data['last_name'];
        }

        if (!empty($data['email'])) {
            $newData['email'] = $data['email'];
        }

        if (!empty($data['former_name'])) {
            $newData['former_name'] = $data['former_name'];
        }

        if (!empty($data['password'])) {
            $newData['password'] = $data['password'];
        }

        $newData['shortname'] = substr($newData['first_name'], 0,1).substr($newData['last_name'],0,1);

        // TODO: validacion de email y password

        // 3. enviar ese modelo de put
        $newData->save();

        return response()->json($newData, 200);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 1
        ]);
    }

    public function updateProfilePic(Request $request, UserHandler $userHandler) {

        $data = $request->all();

        $cloudinaryResponse = $this->uploadPictureToCloudinary($data['image']);

        $user = auth()->user();

        $userHandler->updateUserPicture($user, $cloudinaryResponse['url']);

        return response()->json($user, 200);

    }

    public function getUserById(Request $request, $id) {

        $user = User::findOrFail($id);

        return response()->json($user, 200);

    }


}
