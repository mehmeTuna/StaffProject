<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MinWage extends Model
{
    protected $visible = ['Value', 'country', 'AgeTop', 'AgeBottom', 'Year'];
    protected $fillable = ['Value', 'country', 'AgeTop', 'AgeBottom', 'Year'];
    protected $table = "minwage";
    protected $primaryKey = "Country";
    public $timestamps = true;
}
