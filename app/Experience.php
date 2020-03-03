<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $visible = ['Id', 'active', "Class", "Identifier", "Business", "OwnerClass", "Charge", "Color", "WorkClass", "workingPlan", "Periode", "Factor", "Pay"];
    protected $fillable= ['Id', 'active', "Class", "Identifier", "Business", "OwnerClass", "Charge", "Color", "WorkClass", "workingPlan", "Periode", "Factor", "Pay"];
    protected $table = "experience";
    protected $primaryKey = "Id";
    public $timestamps = true ;
    protected $casts = ['workingPlan' => 'object'];



    public function setworkingPlanAttribute($value)
    {
        if(is_array($value))
            $this->attributes['workingPlan'] = json_encode($value);
        else
            $this->attributes['workingPlan'] = json_encode([]);
    }


    public function business()
    {
       return $this->hasOne ("App\Business", "Id", "Business");
    }


}
