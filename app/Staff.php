<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    protected $visible = ["FirstName", "LastName", "Birthday", "Image", "Adress", "Telephone", "Gsm", "Email", "Gender", "MartialStatus", "Business", "Employment", "Career", "TimeSheetMap", 'workingPlan'];
    protected $fillable = ["FirstName", "LastName", "Birthday", "Image", "Adress", "Password", "Telephone", "Gsm", "Email", "Gender", "MartialStatus", "Business", "Employment", "Career", "TimeSheetMap", 'workingPlan'];
    protected $table = "Staff";
    protected $primaryKey = "Id";
    public $timestamps = true ;

    public function setworkingPlanAttribute($value)
    {
        if(is_array($value))
            $this->attributes['workingPlan'] = json_encode($value);
        else
            $this->attributes['workingPlan'] = json_encode([]);
    }

    public function progressPayment()
    {
        $this->hasOne ("App\StaffPorgressPayment", "Id", "Staff");
    }

    public function career()
    {
        $this->hasManyThrough ("App\Career", "App\Recompense", "Staff", "Staff", "Id" ,"Id");
    }

    public function staffClass()
    {
        $this->hasOne ("App\Career", "Staff", "Id");
    }


}
