<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BusinessEntranceExitLog extends Model
{
    protected $hidden = [];
    protected $guarded = ['id'];
    protected $table = 'business_entrance_exit_log';

}
