<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Experience;

class ExperienceController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }


    public function createExperience(Request $request)
    {
        $request = $request->all();
        $createExperience = "";

        //Nombre para clarificar

        $createExperience = Experience::create([
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

        return $createExperience;
    }

    public function showExperiences(Request $request)
    {
        $userid = Auth::id();

        $experiences = Experience::where('user_id', "=", $userid)->get();

        return response()->json($experiences, 200);
    }

    public function modifyExperience(Request $request)
    {
        $errorExperience = array("Experience doesn't exist");
        $data = $request->all();
        if (Experience::find($data['id']) === null) {
            return $errorExperience;
        } else {
            $data = Experience::find($request->id);

            $data->title = $request->title;
            $data->employment_type = $request->employment_type;
            $data->location = $request->location;
            $data->start_date = $request->start_date;
            $data->end_date = $request->end_date;
            $data->headline = $request->headline;
            $data->description = $request->description;
            $data->company = $request->company;

            $data->save();

            $experienceRecord = Experience::where("id", "=", $data['id'])
                ->first();
        }

        return response()->json($experienceRecord, 200);
    }
}

;
