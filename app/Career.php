<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Career extends Model
{

    protected $visible = ['id', 'businessId', 'experience', 'staff', 'active', 'workClass', 'beginTime', 'endTime', 'created_at', 'updated_at'];
    protected $fillable = ['id', 'businessId', 'experience', 'staff', 'active', 'workClass', 'beginTime', 'endTime', 'created_at', 'updated_at'];
    protected $table = "career";
    protected $primaryKey = "id";
    public $timestamps = true;

    public function scopeActive($query)
    {
        return $query->where('active', 1);
    }

}
