<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class KioskRegisterCode extends Model
{
    protected $fillable = ['id' ,'code', 'createdIp' ,'usedIp' ,'businessId' ,'active' ,'updated_at' ,'created_at'];
    protected $visible = ['id' ,'code', 'createdIp' ,'usedIp' ,'businessId' ,'active' ,'updated_at' ,'created_at'];
    protected $primaryKey = 'id';
    protected $table = 'kioskCode';
}
