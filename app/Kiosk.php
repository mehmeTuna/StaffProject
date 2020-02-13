<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Kiosk extends Model
{
    protected $visible = ["Identifier", "RemoteAddress", "Comment", 'Business', 'Active'];
    protected $fillable = ["Identifier", "RemoteAddress", "Comment", 'Business', 'Active'];
    protected $table = "kiosk";
    protected $primaryKey = "Id";
    public $timestamps = true ;

    public function business()
    {
        return $this->hasOne ("App\Business", "Id", "Business");
    }

}
