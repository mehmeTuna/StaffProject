<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Relay extends Model
{
    protected $visible = ["Comment", "ExpireTime", "Active", "created_at"];
    protected $table = "relay";
    protected $primaryKey = "Id";
    public $timestamps = true ;

    public function business()
    {
        $this->hasOne ("App\Relay", "Id","Business");
    }
}
