<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $visible = ["Class", "Identifier", "Business", "OwnerClass", "Charge", "Color", "WorkClass"];
    protected $fillable= ["Class", "Identifier", "Business", "OwnerClass", "Charge", "Color", "WorkClass"];
    protected $table = "experience";
    protected $primaryKey = "Id";
    public $timestamps = true ;

    public function business()
    {
        $this->hasOne ("App\Business", "Id", "Business");
    }
}
