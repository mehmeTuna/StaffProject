<?php


namespace App\Observers;

use App\Business;
use Carbon\Carbon;
use App\PlanDetail ;


class BusinessObserver
{

    public function creating(Business $business)
    {
        $planDetail = PlanDetail::find(1);
 
        $business->packageTime = Carbon::now()->addDay($planDetail->day);
        $business->lastLoginTime = Carbon::now()->addDay(3);
        $business->username = str_slug($business->businessName);
    }

    /**
     * Listen to the Business created event.
     *
     * @param  Business  $business
     * @return void
     */
    public function created(Business $business)
    {

    }
}