<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PlanDetail extends Model
{
    protected $hidden = ['created_at', 'updated_at'];
    protected $guarded = ['id'];
    protected $table = 'business_plan_detail';
    protected $primaryKey = 'id';
    public $timestamps = true;
}