<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Charge extends Model
{
    protected $visible = ["Manager", "Business", "Periode", "Factor", "Pay", "Experience"];
    protected $fillable = ["Manager", "Business", "Periode", "Factor", "Pay", "Experience"];
    protected $table = "charge";
    protected $primaryKey = "Id";
    public $timestamps = true ;
}
