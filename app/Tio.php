<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tio extends Model
{
    protected $visible = ["Id", 'Staff', "TimeSheet", "Link", 'Active', 'Business', "Comment", "ToleransStyle", "Tolerance", "Hour", "Traffic", 'KioskId', 'KioskIp', 'created_at'];
    protected $fillable = ["Id", 'Staff', "TimeSheet", "Link", 'Active', 'Business', "Comment", "ToleransStyle", "Tolerance", "Hour", "Traffic", 'KioskId', 'KioskIp', 'created_at'];
    protected $table = "tio";
    protected $primaryKey = "Id";
    protected $dateFormat = 'U';

}
