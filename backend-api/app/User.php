<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{

    protected $table = 'user';

    protected $fillable = ['email', 'password', 'first_name', 'last_name', 'former_name', 'headline'];

    protected $guarded = ['id'];

    protected $hidden = ['password'];
}

