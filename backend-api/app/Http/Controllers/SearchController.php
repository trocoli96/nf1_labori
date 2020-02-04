<?php


namespace App\Http\Controllers;


use App\User;

use Illuminate\Http\Request;

class SearchController extends Controller
{

function returnSearch (Request $request) {

    $orders = User::search('first_name')->get();

    return User::search($request->search)->get();
}
}
