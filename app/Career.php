<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Career extends Model
{

    protected $visible = ["BeginTime", "EndTime", "WorkClass", "Staff", "Experience", "Recompense"];
    protected $fillable = ["BeginTime", "EndTime", "WorkClass", "Staff", "Experience", "Recompense"];
    protected $table = "career";
    protected $primaryKey = "Id";
    public $timestamps = true ;


}
