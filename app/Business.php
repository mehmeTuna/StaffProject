<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Business extends Model
{
    protected $hidden = ['password', 'active', 'longitute', 'latitude', 'options', 'experienceData', 'staffData', 'kioskData', 'plan_id', 'lastLoginTime', 'created_at', 'updated_at'];
    protected $guarded = ['id'];
    protected $table = 'business';
    protected $primaryKey = 'id';
    public $timestamps = true; 

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'data' => 'object',
        'options' => 'object',
        'experienceClass' => 'object',
        'experienceData' => 'object',
        'staffData' => 'object',
        'kioskData' => 'object',
    ];

    /**
     * The model's default values for attributes.
     *
     * @var array
     */
    protected $attributes = [
        'address' => '',
        'experienceData' => '',
        'staffData' => '',
        'kioskData' => '',
    ];

    //query add where closure active = 1
    public function scopeActive($query)
    {
        return $query->where('active', 1);
    }

    public function staff()
    {
        return $this->hasMany('App\Staff', 'business', 'id')
            ->where('staff.active', 1)
            ->orderBy('staff.created_at', 'desc');
    }

    public function experience()
    {
        return $this->hasMany('App\Experience', 'business', 'id')
            ->where('experience.active', 1)
            ->orderBy('experience.created_at', 'desc');
    }

    public function kiosk()
    {
        return $this->hasMany('App\Kiosk', 'business', 'id')->where('kiosk.active', 1);
    }

    public function lastPayment()
    {
        return $this->hasManyThrough('App\Staff', 'App\PaymentHistory', 'staff', 'business', 'id')->orderBy('paymenthistory.created_at','desc');
    }

    public function lastLog()
    {
        return $this->hasManyThrough('App\Staff', 'App\Tio', 'staff', 'business', 'id')->orderBy('tio.created_at','desc');
    }

    public function staffWithPayment()
    {
        return $this->hasMany('App\Staff', 'business', 'id')->where('active', 1)->where('balance', '>', 0)->orderBy('balance', 'desc');
    }

    public function tio()
    {
        return $this->hasMany('App\Tio', 'business', 'id');
    }

    public function planDetail(){
        return $this->hasOne('App\PlanDetail', 'id', 'plan_id');
    }

    /**
     * @param string $value
     * @return void
     */
    public function setExperienceClassAttribute($value)
    {
        $this->attributes['experienceClass'] = json_encode($value);
    }


    /**
     * @param string $value
     * @return void
     */
    public function setDataAttribute($value)
    {
        $this->attributes['data'] = json_encode($value);
    }

    /**
     * @param string $value
     * @return void
     */
    public function setOptionsAttribute($value)
    {
        $this->attributes['options'] = json_encode($value);
    }

    /**
     * @param string $value
     * @return void
     */
    public function setExperienceDataAttribute($value)
    {
        $this->attributes['experienceData'] = json_encode($value);
    }

    /**
     * @param string $value
     * @return void
     */
    public function setStaffDataAttribute($value)
    {
        $this->attributes['staffData'] = json_encode($value);
    }

    /**
     * @param string $value
     * @return void
     */
    public function setKioskDataAttribute($value)
    {
        $this->attributes['kioskData'] = json_encode($value);
    }

}
