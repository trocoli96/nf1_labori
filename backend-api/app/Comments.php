<?php


namespace App;


use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
class Comments extends Authenticatable
{
    use Notifiable;

    protected $table = 'comments';


    protected $fillable = [
        'comment_body','created_at', 'author_id', 'id', 'post_id'
    ];

    protected $guarded = [
        'author_id', 'id', 'post_id'
    ];

    protected $hidden = [
      'remember_token',
    ];
}
