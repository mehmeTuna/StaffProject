<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Recompense extends Model
{
    protected $visible = ["Manager", "Business", "Staff", "Career", "Comment", "Periode", "Factor", "Pay", "AdjustTime"];
    protected $table = "recompense";
    protected $primaryKey = "Id";
    public $timestamps = true ;


}
