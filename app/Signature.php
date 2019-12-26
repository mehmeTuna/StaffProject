<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Signature extends Model
{
    protected $visible =["UIC", "HRC", "created_at", "Vita", "Business"];
    protected $table= "signature";
    protected $primaryKey= "Id";
    public $timestamps = true ;

    //signature a ait business getirir
    public function business()
    {
        $this->hasOne ("App\Business", "Id", "Business");
    }
}
