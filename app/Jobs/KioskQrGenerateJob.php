<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Cache;
use Carbon\Carbon;
use App\Events\KioskEvent;
use App\Kiosk ;

class KioskQrGenerateJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $kiosk ;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Kiosk $kiosk)
    {
        $this->kiosk = $kiosk ;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $code = str_random(20);
        Cache::put($code, $this->kiosk->remoteAddress, Carbon::now()->addMinutes(100));

        broadcast(new KioskEvent([
            'kioskId' =>  $this->kiosk->remoteAddress,
            'isLogin' => true,
            'business' => $this->kiosk->getBusiness,
            'refreshQrCode' => env('APP_URL').'/kiosk/staff/'.$code,
        ]));
    }
}
