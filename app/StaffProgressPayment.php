<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StaffProgressPayment extends Model
{
    protected $visible = ["Staff", "DueTime", "Value", 'Active', "Tax", "Comment", "Recompense", "Pay", "Factor", "Periode", "RoundFactor", "TotalSeconds"];
    protected $table = "progresspayment";
    protected $primaryKey = "Id";
    public $timestamps = true ;

}