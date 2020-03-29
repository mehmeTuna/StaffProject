<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Business extends Model
{
    protected $visible = ['id', 'email', 'username', 'phone', 'active', 'webPage', 'image', 'longitute', 'latitude', 'address', 'businessName', 'options', 'data', 'experienceData', 'staffData', 'kioskData', 'packageTime', 'lastLoginTime', 'created_at', 'updated_at'];
    protected $fillable = ['password', 'email', 'username', 'phone', 'active', 'webPage', 'image', 'longitute', 'latitude', 'address', 'businessName', 'options', 'data', 'experienceData', 'staffData', 'kioskData', 'packageTime', 'lastLoginTime', 'created_at', 'updated_at'];
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
        return $this->hasMany('App\Staff', 'business', 'id')->where('active', 1)->orderBy('created_at', 'desc')->limit(40);
    }

    public function experience()
    {
        return $this->hasMany('App\Experience', 'business', 'id')->where('active', 1)->orderBy('created_at', 'desc');
    }

    public function kiosk()
    {
        return $this->hasMany('App\Kiosk', 'business', 'id')->where('kiosk.active', 1);
    }

    public function onlineKiosk()
    {
        return $this->hasManyThrough('App\Kioskqrcode', 'App\Kiosk', 'business', 'ip', 'remoteAddress')->where('kioskqrcode.updated_at','>=', Carbon::now()->addMinute(-5)->toDateTimeString());
    }

    public function lastPayment()
    {
        return $this->hasManyThrough('App\Staff', 'App\PaymentHistory', 'staff', 'business', 'id')->orderBy('paymenthistory.created_at','desc')->limit(20);
    }

    public function lastLog()
    {
        return $this->hasManyThrough('App\Staff', 'App\Tio', 'staff', 'business', 'id')->orderBy('tio.created_at','desc')->limit(20);
    }

    public function staffWithPayment()
    {
        return $this->hasMany('App\Staff', 'business', 'id')->where('active', 1)->where('balance', '>', 0)->orderBy('balance', 'desc')->limit(40);
    }

    public function tio()
    {
        return $this->hasMany('App\Tio', 'business', 'id');
    }

    /**
     *
     *
     * @param string $value
     * @return void
     */
    public function setExperienceClassAttribute($value)
    {
        $this->attributes['experienceClass'] = json_encode($value);
    }

    /**
     *
     *
     * @param string $value
     * @return void
     */
    public function setDataAttribute($value)
    {
        $this->attributes['data'] = json_encode($value);
    }

    /**
     *
     *
     * @param string $value
     * @return void
     */
    public function setOptionsAttribute($value)
    {
        $this->attributes['options'] = json_encode($value);
    }

    /**
     *
     *
     * @param string $value
     * @return void
     */
    public function setExperienceDataAttribute($value)
    {
        $this->attributes['experienceData'] = json_encode($value);
    }

    /**
     *
     *
     * @param string $value
     * @return void
     */
    public function setStaffDataAttribute($value)
    {
        $this->attributes['staffData'] = json_encode($value);
    }

    /**
     *
     *
     * @param string $value
     * @return void
     */
    public function setKioskDataAttribute($value)
    {
        $this->attributes['kioskData'] = json_encode($value);
    }

}
