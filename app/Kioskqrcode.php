<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Kioskqrcode extends Model
{
    protected $visible = ['id', 'code', 'active', 'ip', 'comment', 'created_at', 'updated_at'];
    protected $fillable = ['id', 'code', 'active', 'ip', 'comment', 'created_at', 'updated_at'];
    protected $table = "kioskqrcode";
    protected $primaryKey = "id";
    protected $attributes = [
        'comment' => ''
    ];

    public $timestamps = true;
}
