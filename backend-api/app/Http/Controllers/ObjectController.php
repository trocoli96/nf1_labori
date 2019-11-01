<?php


namespace App\Http\Controllers;
use App\Providers\education;
Use Illuminate\Http\Request;


class ObjectController extends Controller
{
    public function createEducation(Request $request) {
        $request = $request->all();

        $education = education::create(
            ['school'=> $request['school'],
        'degree'=> $request['degree'],
        'field_of_study'=> $request['field_of_study'],
        'start_year'=> $request['start_year'],
        'end_year'=> $request['end_year'],
        'grade'=> $request['grade'],
        'activities'=> $request['activities'],
        'description'=> $request['description']]
        );
        return $education ;

    }
}
