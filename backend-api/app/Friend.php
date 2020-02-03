<?php


namespace App;


use Illuminate\Database\Eloquent\Model;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Friend extends Model
{

    use Notifiable;

    protected $table = 'friends';

    protected $fillable = ['user_id', 'is_following'];
}
