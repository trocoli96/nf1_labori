<?php


namespace App\Contracts\Experiences;


interface ExperienceHandler
{
    public function find($experienceId);

    public function all();

    public function findbyuser($userid);

}
