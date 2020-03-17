<?php


namespace App\Observers;

use App\Career;
use App\Employment;
use App\Staff;

class StaffObserver
{
    /**
     * Listen to the Staff creating event.
     *
     * @param  Staff  $staff
     * @return void
     */
    public function creating(Staff $staff)
    {

    }

    public function created(Staff $staff)
    {
        $career = Career::create([
            'BeginTime' => time(),
            'WorkClass' => 1,//TODO: bu kisim frontend e working plan kismi hazir olduktan sonra eklenecek simdilik varsayilan 1,
            'Staff' => $staff->Id,
            'Experience' => $staff->Experience,
            'Recompense' => 1
        ]);

        //TODO: bus kisim creating icine tasinacak
        $staff->update([
            'Career' => $career->Id
        ]);

        $employment = Employment::create([
            'Manager' => $staff->Business,
            'Business' => $staff->Business,
            'OperationTime' => time(),
            'Status' => 'Recruitment',
            'Staff' => $staff->Id,
        ]);
    }
}