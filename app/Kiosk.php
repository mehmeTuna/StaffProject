<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Kiosk extends Model
{
    protected $visible = ['id', 'active', "identifier", "remoteAddress", "comment", 'business', 'created_at', 'updated_at'];
    protected $fillable = ['id', 'active', "identifier", "remoteAddress", "comment", 'business', 'created_at', 'updated_at'];
    protected $table = "kiosk";
    protected $primaryKey = "id";
    protected $attributes = [
        'comment' => ''
    ];

    public $timestamps = true;

    public function getBusiness()
    {
        return $this->hasOne("App\Business", "id", "business")->where('active', 1);
    }

    public function scopeActive($query)
    {
        return $query->where('active', 1);
    }

    public function online()
    {
        return $this->hasMany('App\Kioskqrcode', 'ip','remoteAddress')->where('updated_at', '>=', Carbon::now()->addMinute(-5)->toDateTimeString());
    }

    public function qrCode()
    {
        return $this->hasMany('App\Kioskqrcode', 'ip','remoteAddress');
    }

}
