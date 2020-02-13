<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PaymentHistory extends Model
{
    protected $visible= ['id','type', "staff", 'pay', 'active', 'created_at', 'updated_at'];
    protected $fillable= ['id','type', "staff", 'pay', 'active', 'created_at', 'updated_at'];
    protected $table = 'paymenthistory';
    protected $primaryKey = 'id';
    public $timestamps = true;
}
