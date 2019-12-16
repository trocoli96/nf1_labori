<?php


namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;


class ExperienceController extends Controller
{
    public function createExperience(Request $request)
    {
        $request = $request->all();
        $post = "";

        $post = Experience::create([
            'title' => $request['title'],
            'employment_type' => $request['employment_type'],
            'company' => $request['company'],
            'location' => ($request['location']),
            'start_date' => ($request['start_date']),
            'end_date' => ($request['end_date']),
            'user_id' => ($request['user_id']),
            'headline' => ($request['headline']),
            'description' => ($request['description'])
        ]);

        return $post;
    }

};
