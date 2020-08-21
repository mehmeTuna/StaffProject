<?php

namespace App\Jobs;

use App\BusinessEntranceExitLog;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class BusinessEntranceExitJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $businessId ;
    protected $type ;

    /**
     * Create a new job instance.
     *
     * @param $businessId
     * @param $type
     */
    public function __construct($businessId, $type)
    {
        $this->businessId = $businessId;
        $this->type = $type ;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        BusinessEntranceExitLog::create([
            'business_id' => $this->businessId,
            'type' => $this->type
        ]);
    }
}
