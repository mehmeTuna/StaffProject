<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Business extends Model
{
    protected $visible= ['Id','Email', 'Longitute', 'Latitude', 'Options', 'Data', 'created_at', 'updated_at'];
    protected $fillable= ['Email', 'Username', 'Address', 'BusinessName', 'Phone'];
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
    ];

    //ex: $category = Category::active()->get(); aktif olan kategori
    public function scopeActive($query)
    {
        return $query->where('active', '=', 1);
    }

     /**
     * 
     *
     * @param  string  $value
     * @return void
     */
    public function setDataAttribute($value)
    {
        $this->attributes['Data'] = json_encode($value);
    }

     /**
     * 
     *
     * @param  string  $value
     * @return void
     */
    public function setOptionsAttribute($value)
    {
        $this->attributes['Options'] = json_encode($value);
    }

    /**
     * Get admin record associated with the Business
     */
    public function admin()
    {
        $this->hasOne('App\BusinessAdmin','Id','AdminId' );
    }

    public function signature()
    {
        $this->hasOne ("App\Signature", "Business", "Id");
    }

    public function experience()
    {
        $this->hasOne ("App\Experience", "Business", "Id");
    }

    public function relay()
    {
        $this->hasOne ("App\Relay", "Business", "Id");
    }
    public function kiosk ()
    {
        $this->hasOne ("App\Kiosk", "Business", "Id");
    }
}
