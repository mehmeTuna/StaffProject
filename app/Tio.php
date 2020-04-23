<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tio extends Model
{
    protected $hidden = ['tolerance', 'kioskId', 'updated_at'];
    protected $guarded = ['id'];
    protected $table = "tio";
    protected $primaryKey = "id";
    protected $dateFormat = 'U';

}
