<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    protected $visible = ['Id', "FirstName", 'active', "LastName", "Birthday", 'Balance', "Image", 'Factor', 'Periode', 'Pay', "Adress", 'salary', "Telephone", "Gsm", "Email", "Gender", "MartialStatus", "Business", "Employment", "Career", "TimeSheetMap", 'workingPlan', 'Experience' ,'operationtime'];
    protected $fillable = ['Id', "FirstName", 'active', "LastName", "Birthday", 'Balance', "Image", 'Factor', 'Periode', 'Pay', "Adress", 'salary', "Password", "Telephone", "Gsm", "Email", "Gender", "MartialStatus", "Business", "Employment", "Career", "TimeSheetMap", 'workingPlan', 'Experience' ,'operationtime'];
    protected $table = "staff";
    protected $primaryKey = "Id";
    protected $dateFormat = 'U';
    protected $casts = [
        'workingPlan' => 'object',
    ];

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
