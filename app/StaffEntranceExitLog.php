<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StaffEntranceExitLog extends Model
{
    protected $guarded = ['id'];
    protected $hidden = ['updated_at'];
    protected $table = 'staff_entrance_exit_log';
}
