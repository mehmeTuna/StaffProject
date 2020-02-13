<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Kioskqrcode extends Model
{
    protected $visible = ["code", "ip", "Business", "active", "time"];
    protected $fillable= ["code", "ip", "Business", "active", "time"];
    protected $table = "kioskqrcode";
    protected $primaryKey = "id";
    public $timestamps = true ;
}
