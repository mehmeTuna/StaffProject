<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Kioskqrcode extends Model
{
    protected $visible = ['id', 'code', 'active', 'ip', 'comment', 'created_at', 'updated_at'];
    protected $fillable = ['id', 'code', 'active', 'ip', 'comment', 'created_at', 'updated_at'];
    protected $table = "kioskqrcode";
    protected $primaryKey = "id";
    protected $attributes = [
        'comment' => ''
    ];

    public $timestamps = true;

    public function online()
    {
        return $this->hasMany('App\Kiosk', 'remoteAddress', 'ip')->where('kioskqrcode.updated_at','>=', Carbon::now()->addMinute(-5)->toDateTimeString());
    }
}
