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
            'endTime' => '',
            'workClass' => 1,//TODO: bu kisim frontend e working plan kismi hazir olduktan sonra eklenecek simdilik varsayilan 1,
            'staff' => $staff->id,
            'experience' => $staff->experience,
        ]);

        //TODO: bus kisim creating icine tasinacak
        $staff->update([
            'career' => $career->id
        ]);

        $employment = Employment::create([
            'manager' => $staff->business,
            'business' => $staff->business,
            'operationTime' => time(),
            'status' => 'Recruitment',
            'staff' => $staff->id,
        ]);
    }
}