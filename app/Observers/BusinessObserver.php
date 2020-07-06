<?php


namespace App\Observers;

use App\Business;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use App\PlanDetail;
use App\Jobs\SendEmailToBusinessJob;

class BusinessObserver
{

    public function creating(Business $business)
    {
        $planDetail = PlanDetail::find(1);

        $business->plan_id = $planDetail->id;
        $business->packageTime = Carbon::now()->addDay($planDetail->day);
        $business->lastLoginTime = Carbon::now();
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
        dispatch(new SendEmailToBusinessJob($business->email));
    }
}
