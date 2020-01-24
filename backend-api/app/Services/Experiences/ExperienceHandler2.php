<?php


namespace App\Services\Experiences;

use App\Contracts\Experiences\ExperienceHandler as Handler;
use App\Experience;

class ExperienceHandler2 implements Handler
{

    public function find($experienceId)
    {
        return Experience::find($experienceId);
    }

    public function all()
    {
        return Experience::all();
    }

    public function findbyuser($userid)
    {
        return Experience::where('experience.user_id', $userid)->get();
    }
}
