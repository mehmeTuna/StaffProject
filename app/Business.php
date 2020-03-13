<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Business extends Model
{
    protected $visible = ['Id', 'Email', "Password", 'Longitute', 'Latitude', 'BusinessName', 'Options', 'Data', 'created_at', 'updated_at', 'Country', 'ExperienceClass', 'Lang'];
    protected $fillable = ['Email', "Password", 'Username', 'Address', 'BusinessName', 'Phone', 'ExperienceClass', 'Country', 'Lang'];
    protected $table = 'business';
    protected $primaryKey = 'Id';
    public $timestamps = true;

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'Data' => 'object',
        'Options' => 'object',
        'ExperienceClass' => 'object'
    ];

    //query add where closure active = 1
    public function scopeActive($query)
    {
        return $query->where('active', 1);
    }

    public function staff()
    {
        return $this->hasMany('App\Staff', 'Business', 'Id')->where('active', 1);
    }

    public function experience()
    {
        return $this->hasMany('App\Experience', 'Business', 'Id')->where('active', 1);
    }

    public function kiosk()
    {
        return $this->hasMany('App\Kiosk', 'Business', 'Id')->where('active', 1);
    }

    /**
     *
     *
     * @param string $value
     * @return void
     */
    public function setExperienceClassAttribute($value)
    {
        $this->attributes['ExperienceClass'] = json_encode($value);
    }

    /**
     *
     *
     * @param string $value
     * @return void
     */
    public function setDataAttribute($value)
    {
        $this->attributes['Data'] = json_encode($value);
    }

    /**
     *
     *
     * @param string $value
     * @return void
     */
    public function setOptionsAttribute($value)
    {
        $this->attributes['Options'] = json_encode($value);
    }


}
