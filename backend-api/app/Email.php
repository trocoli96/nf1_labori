<?php


namespace App;
use Illuminate\Database\Eloquent\Model;

class Email extends Model
{
    public $table = 'user';


    function user() {
        print 'Inside `email()`';
    }
}
