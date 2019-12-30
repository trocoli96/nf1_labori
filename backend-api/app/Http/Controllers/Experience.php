<?php


namespace App;
namespace App\Http\Controllers;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $table = 'experience';
    protected $fillable = ['title', 'employment_type', 'company', 'location', 'start_date', 'end_date', 'user_id', 'headline', 'description'];

}
