<?php




class Email extends Model
{
    public $table = 'user';


    function user() {
        print 'Inside `email()`';
    }
}
