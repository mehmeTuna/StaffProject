<?php


namespace App\Observers;

use App\Career;
use App\Employment;
use App\Staff;
use Carbon\Carbon;

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
        $staffWorkingPlan = $staff->workingPlan ;
        $calculatedTime = 0 ;
        $days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

        foreach ($days as $day) {
            if (isset($staffWorkingPlan[$day]) && count($staffWorkingPlan[$day])) {
                foreach ($staffWorkingPlan[$day] as $result) {
                    $startTime = Carbon::parse($result['start']);
                    $finishTime = Carbon::parse($result['end']);

                    $totalDuration = $finishTime->diffInSeconds($startTime);
                    $calculatedTime += $totalDuration;
                }
            }
        }

        $factorValue = ['hour', 'week', 'month'];
        $factor = array_key_exists($staff->factor, $factorValue) ? $staff->factor : 'hour';
        $salary = 0;

        switch ($factor) {
            case 'hour':
                $pay = $staff->pay / $staff->periode;
                $salary = round($pay, 2);
                break;
            case 'week':
                $pay = round(($calculatedTime / 3300), 2) * $staff->periode;
                $pay = $staff->pay / $pay;
                $salary = round($pay, 2);
                break;
            case 'month':
                $calculatedTime = $calculatedTime * 4;
                $pay = round(($calculatedTime / 3300), 2) * $staff->periode;
                $pay = $staff->pay / $pay;
                $salary = round($pay, 2);
                break;
        }


        $staff->workingPlan = $staffWorkingPlan;
        $staff->salary = $salary ;
    }

    public function created(Staff $staff)
    {
        $career = Career::create([
            'endTime' => '',
            'workClass' => 1,//TODO: bu kisim frontend e working plan kismi hazir olduktan sonra eklenecek simdilik varsayilan 1,
            'staff' => $staff->id,
            'experience' => $staff->experience,
        ]);

        $employment = Employment::create([
            'business' => $staff->business,
            'status' => 'Recruitment',
            'staff' => $staff->id,
        ]);

        $staff->update([
            'career' => $career->id,
            'employment' => $employment->id
        ]);
    }
}