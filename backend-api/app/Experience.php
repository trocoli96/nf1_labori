<?php


namespace App;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $table = 'experience';
    protected $fillable = ['title', 'company', 'location', 'start_date', 'end_date', 'user_id', 'description'];

}
