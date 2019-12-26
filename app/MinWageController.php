<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MinWageController extends Model
{
    protected $visible = ["BeginTime", "EndTime", "WorkClass", "Staff", "Experience", "Recompense"];
    protected $table = "minwage";
    protected $primaryKey = "Id";
    public $timestamps = true ;
}
