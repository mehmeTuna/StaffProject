<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Kiosk extends Model
{
    protected $visible = ["Identifier", "RemoteAddress", "Comment"];
    protected $table = "kiosk";
    protected $primaryKey = "Id";
    public $timestamps = true ;

    public function business()
    {
        $this->hasOne ("App\Business", "Id", "Business");
    }


}
