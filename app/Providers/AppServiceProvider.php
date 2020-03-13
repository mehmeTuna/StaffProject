<?php

namespace App\Providers;

use App\Business;
use App\Observers\BusinessObserver;
use App\Observers\StaffObserver;
use App\Staff;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
        Business::observe(BusinessObserver::class); //business event listen
        Staff::observe(StaffObserver::class);//staff event listener
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
