<?php

namespace App\Jobs;

use App\Staff;
use App\StaffEntranceExitLog;
use App\Tio;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class StaffLoginJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $staff ;
    protected $type ;

    /**
     * Create a new job instance.
     *
     * @param Staff $staff
     * @param $type
     */
    public function __construct(Staff $staff, $type)
    {
        $this->staff = $staff ;
        $this->type = $type ;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        /*
        StaffEntranceExitLog::create([
            'staff_id' => $this->staff->id,
            'type' => $this->type
        ]);

        */
    }
}
