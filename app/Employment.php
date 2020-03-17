<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Employment extends Model
{
    protected $visible = ['id', 'business', 'staff', 'active', 'comment', 'status', 'created_at', 'updated_at'];
    protected $fillable = ['id', 'business', 'staff', 'active', 'comment', 'status', 'created_at', 'updated_at'];
    protected $table = "employment";
    protected $primaryKey = "id";
    public $timestamps = true;

    public function scopeActive($query)
    {
        return $query->where('active', 1);
    }
}
