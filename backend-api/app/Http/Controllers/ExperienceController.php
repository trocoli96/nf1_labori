<?php


namespace App\Http\Controllers;

use App\Contracts\Experiences\ExperienceHandler;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Experience;

class ExperienceController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['showExperiencesById']]);
    }


    public function createExperience(Request $request)
    {
        $request = $request->all();
        $userid = Auth::id();

        $createExperience = Experience::create([
            'title' => $request['title'],
            'company' => $request['company'],
            'location' => $request['location'],
            'start_date' => $request['start_date'],
            'end_date' => $request['end_date'],
            'user_id' => $userid,
            'description' => ($request['description'])
        ]);

        return response()->json($createExperience, 200);
    }

    public function showExperiences(Request $request)
    {
        $userid = Auth::id();

        $experiences = Experience::where('user_id', "=", $userid)->orderBy('start_date', 'desc')->get();

        return response()->json($experiences, 200);
    }

    public function showExperiencesById(Request $request, $id)
    {
        $experiences = Experience::where('user_id', "=", $id)->orderBy('start_date', 'desc')->get();

        return response()->json($experiences, 200);
    }

    public function deleteExperience(Request $request, ExperienceHandler $experienceHandler) {

        $data = $request->all();

        $userId = Auth::id();

        // comprobamos que user_id de la experience corresponda con el user.id
        if ($userId !== $data['user_id']) {
            return response()->json("Permission denied.", 403);
        }

        $experience = $experienceHandler->find($data['id']);
        $experience->delete();

        return response()->json(["Succesfully deleted", $experience], 200);

    }

    // NOT IN USE
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
