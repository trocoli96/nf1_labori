<?php


namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;


class ExperienceController extends Controller
{
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
    public function showExperience($id)
    {
        $error = 'Experience not found';

        $experienceId = Experience::where('id',"=",$id)
            ->first();
        $experienceInfo = array($experienceId['id'],
            $experienceId['title'],
            $experienceId['employment_type'],
            $experienceId['company'],
            $experienceId['location'],
            $experienceId['start_date'],
            $experienceId['end_date'],
            $experienceId['user_id'],
            $experienceId['headline'],
            $experienceId['description']
        );
            if(!empty($experienceId)){
                return $experienceInfo;
            }
            else{
                return $error;
            }
    }
    public function modifyExperience(Request $request)
    {
        $errorExperience = array("Experience doesn't exist");
        $data = $request->all();
        if (Experience::find($data['id']) === null) {
            return $errorExperience;
        }
        else {
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
        return $experienceRecord;
    }
};
