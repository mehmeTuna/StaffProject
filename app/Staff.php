<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    protected $visible = ['id', 'firstName', 'experience', 'workingPlan', 'lastName', 'active', 'loginToken', 'balance', 'totalPayment', 'salary', 'birthday', 'image', 'address', 'telephone', 'gsm', 'email', 'gender', 'martialStatus', 'lang', 'business', 'emaployment', 'career', 'timeSheetMap'];
    protected $fillable = ['id', 'password', 'experience', 'workingPlan', 'firstName', 'lastName', 'active', 'loginToken', 'balance', 'totalPayment', 'salary', 'birthday', 'image', 'address', 'telephone', 'gsm', 'email', 'gender', 'martialStatus', 'lang', 'business', 'emaployment', 'career', 'timeSheetMap'];
    protected $table = "staff";
    protected $primaryKey = "id";
    protected $dateFormat = 'U';
    protected $casts = [
        'workingPlan' => 'object',
    ];

    public function scopeActive($query, $id)
    {
        return $query->where('id', $id)->where('active', 1);
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
