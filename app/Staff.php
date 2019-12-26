<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    protected $visible = ["ForeName", "MiddleName", "LastName", "Birthday", "Image", "Adress", "Password", "Telephone", "Gsm", "Email", "Gender", "MartialStatus", "Lang", "Business", "Employment", "Career", "TimeSheetMap"];
    protected $fillable = ["FirstName", "LastName", "Telephone", "Password", "Business"];
    protected $table = "Staff";
    protected $primaryKey = "Id";
    public $timestamps = true ;

    public function progressPayment()
    {
        $this->hasOne ("App\StaffPorgressPayment", "Id", "Staff");
    }

    public function career()
    {
        $this->hasManyThrough ("App\Career", "App\Recompense", "Staff", "Staff", "Id" ,"Id");
    }


}
