<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PaymentHistory extends Model
{
    protected $hidden = ['active', 'updated_at'];
    protected $guarded = ['id'];
    protected $table = 'paymenthistory';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $attributes = [
        'comment' => 'default'
    ];
}
