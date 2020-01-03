<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MinWage extends Model
{
    protected $visible = ['Value', 'Country', 'AgeTop', 'AgeBottom', 'Year'];
    protected $fillable = ['Value', 'Country', 'AgeTop', 'AgeBottom', 'Year'] ;
    protected $table = "minwage";
    protected $primaryKey = "Id";
    public $timestamps = true ;
}
