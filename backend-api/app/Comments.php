<?php


namespace App;


use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
class Comments
{
    use Notifiable;

    protected $table = 'Comments';


    protected $fillable = [
        'Body'
    ];

    protected $guarded = [
        'author_id', 'id'
    ];

    protected $hidden = [
      'remember_token',
    ];
}
