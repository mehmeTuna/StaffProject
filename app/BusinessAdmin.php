<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BusinessAdmin extends Model
{
    protected $visible= ['Id'];
    protected $table = 'businessadmin';
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
     * Get business record associated with the BusinessAdmin
     */
    public function business()
    {
        $this->hasOne('App\Business','Id','AdminId' );
    }
}
