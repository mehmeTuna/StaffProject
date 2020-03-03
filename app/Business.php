<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Business extends Model
{
    protected $visible = ['Id', 'Email', "Password", 'Longitute', 'Latitude', 'Options', 'Data', 'created_at', 'updated_at', 'Country', 'ExperienceClass', 'Lang'];
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


    public function minWage()
    {
        return $this->hasMany("App\MinWage", "Country", "Country");
    }

    /**
     * Get admin record associated with the Business
     */
    public function admin()
    {
        return $this->hasOne('App\BusinessAdmin', 'Id', 'AdminId');
    }

    public function signature()
    {
        return $this->hasOne("App\Signature", "Business", "Id");
    }

    public function experience()
    {
        return $this->hasOne("App\Experience", "Business", "Id");
    }

    public function relay()
    {
        return $this->hasOne("App\Relay", "Business", "Id");
    }

    public function kiosk()
    {
        return $this->hasOne("App\Kiosk", "Business", "Id");
    }

    public function staff()
    {
        return $this->hasMany("App\Staff", "Business", "Id");
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

    //ex: $category = Category::active()->get(); aktif olan kategori
    public function scopeActive($query)
    {
        return $query->where('active', '=', 1);
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
