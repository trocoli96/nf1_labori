<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Request;


class ProfileController extends Controller
{
    public function show($id)
    {
        $users = get::table('users')->where('id',$id)->get();
        return view('user.profile',compact('users'));
    }
}
