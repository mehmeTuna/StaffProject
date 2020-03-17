<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $visible = ['id', 'active', "workClass", 'workingPlan', "pay", "factor", "periode", "color", "business", "identifier", "class", 'created_at', 'updated_at'];
    protected $fillable = ['id', 'active', "workClass", 'workingPlan', "pay", "factor", "periode", "color", "business", "identifier", "class", 'created_at', 'updated_at'];
    protected $table = "experience";
    protected $primaryKey = "id";
    protected $casts = ['workingPlan' => 'object'];

    public $timestamps = true;

    protected $attributes = [
        'color' => '#75B72B'
    ];

    public function setWorkingPlanAttribute($value)
    {
        if (is_array($value)) {
            $this->attributes['workingPlan'] = json_encode($value);
        } else {
            $this->attributes['workingPlan'] = json_encode([]);
        }

    }

    public function business()
    {
        return $this->hasOne("App\Business", "id", "business");
    }

}
