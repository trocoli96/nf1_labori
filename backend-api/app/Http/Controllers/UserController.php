
<?php
namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Request;
class UserController extends Controller
{
    public function createUser(Request $request)
    {
        $request = $request->all();
        $user = User::create([
            'first_name' => $request['first_name'],
            'last_name' => $request['last_name'],
            'email' => $request['email'],
            'password' => $request['password'],
            'former_name' => $request['former_name'],
            'headline' => $request['headline'],
            'user_id' => 1,
        ]);
        return $user;
    }
}
