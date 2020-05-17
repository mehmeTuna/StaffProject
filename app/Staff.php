<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    protected $visible = ['id', 'firstName', 'factor', 'pay', 'periode', 'workingPlan', 'online', 'lastName', 'balance', 'totalPayment', 'salary', 'birthday', 'image', 'address', 'telephone', 'gsm', 'email', 'gender', 'martialStatus'];
    protected $fillable = ['id', 'password', 'experience', 'factor', 'pay', 'periode', 'workingPlan', 'online', 'firstName', 'lastName', 'active', 'loginToken', 'balance', 'totalPayment', 'salary', 'birthday', 'image', 'address', 'telephone', 'gsm', 'email', 'gender', 'martialStatus', 'lang', 'business', 'emaployment', 'career', 'timeSheetMap'];
    protected $table = "staff";
    protected $primaryKey = "id";
    protected $casts = [
        'workingPlan' => 'object',
    ];
    protected $attributes = [
        'loginToken' => '',
        'balance' => 0,
        'totalPayment' => 0,
        'timeSheetMap' => 1
    ];

    public function scopeActive()
    {
        return $this->where('active', 1);
    }

    public function setworkingPlanAttribute($value)
    {
        if (is_array($value)) {
            $this->attributes['workingPlan'] = json_encode($value);
        } else {
            $this->attributes['workingPlan'] = json_encode([]);
        }

    }

    public function experinceData()
    {
        return $this->hasOne('App\Experience','id' , 'experince');
    }

    public function businessOwner()
    {
        return $this->hasOne('App\Business', 'id' , 'business');
    }

    public function paymentHistory()
    {
        return $this->hasMany("App\PaymentHistory", "staff", "id")->orderBy('created_at', 'desc')->limit(100);
    }

    public function logHistory()
    {
        return $this->hasMany("App\Tio", "staff", "id")->orderBy('tio.created_at', 'desc')->limit(100);
    }

    public function career()
    {
        return $this->hasManyThrough("App\Career", "App\Recompense", "Staff", "Staff", "Id", "Id");
    }

    public function staffClass()
    {
        return $this->hasOne("App\Career", "Staff", "Id");
    }

    public function kiosk()
    {
        return $this->hashMany('App\Kiosk', 'business', 'business');
    }

}
