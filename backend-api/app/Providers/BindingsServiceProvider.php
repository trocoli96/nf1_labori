<?php


namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\Experiences\ExperienceHandler2;

class BindingsServiceProvider extends ServiceProvider
{
    protected $services = [
        \App\Contracts\Experiences\ExperienceHandler::class => ExperienceHandler2::class
    ];

    public function boot() {

    }

    public function register()
    {
        foreach ($this->services as $contract => $implementation) {
            $this->app->bind($contract, $implementation);
        }
    }
}
