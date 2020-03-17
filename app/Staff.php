<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    protected $visible = ['id', 'firstName', 'experience', 'factor', 'pay', 'periode', 'workingPlan', 'lastName', 'balance', 'totalPayment', 'salary', 'birthday', 'image', 'address', 'telephone', 'gsm', 'email', 'gender', 'martialStatus'];
    protected $fillable = ['id', 'password', 'experience', 'factor', 'pay', 'periode', 'workingPlan', 'firstName', 'lastName', 'active', 'loginToken', 'balance', 'totalPayment', 'salary', 'birthday', 'image', 'address', 'telephone', 'gsm', 'email', 'gender', 'martialStatus', 'lang', 'business', 'emaployment', 'career', 'timeSheetMap'];
    protected $table = "staff";
    protected $primaryKey = "id";
    protected $casts = [
        'workingPlan' => 'object',
    ];
    protected $attributes = [
        'loginToken' => '',
        'balance' => 0,
        'totalPayment' => 0
    ];

    public function scopeActive($query)
    {
        return $query->where('active', 1);
    }

    public function setworkingPlanAttribute($value)
    {
        if (is_array($value)) {
            $this->attributes['workingPlan'] = json_encode($value);
        } else {
            $this->attributes['workingPlan'] = json_encode([]);
        }

    }

    public function progressPayment()
    {
        return $this->hasOne("App\StaffPorgressPayment", "Id", "Staff");
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
