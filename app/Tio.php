<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tio extends Model
{
    protected $visible = ['id', 'staff', 'business', 'kioskId', 'link', 'comment', 'tolerance', 'traffic'];
    protected $fillable = ['id', 'staff', 'business', 'kioskId', 'link', 'comment', 'tolerance', 'traffic'];
    protected $table = "tio";
    protected $primaryKey = "id";
    protected $dateFormat = 'U';

}
