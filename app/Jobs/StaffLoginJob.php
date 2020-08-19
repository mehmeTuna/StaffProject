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
        if(session()->has('kioskIp')){
            $tio = Tio::where('staff', $this->staff->id)->orderBy('created_at', 'desc')->first();

            $newTio = Tio::create([
                'staff' => $this->staff->id,
                'kioskId' => session('kioskIp'),
                'traffic' => $this->staff->online ? 'Leave' : 'Enter',
                'business' => $this->staff->business,
            ]);

            //TODO hesaplamayi matematize et ve merkezi bir noktadan yonet (ayri bir job yaratilabilir)
            if($this->staff->online){
                $difference = time() - $tio->created_at->timestamp;
                $multiplier = $this->staff->salary * ($difference / 3300);

                $oldBalance = $this->staff->balance;
                $newBalance = round(($oldBalance + $multiplier), 2);

                $this->staff->balance = $newBalance ;
            }

            if(!$this->staff->online)
                $this->staff->online = 1;

            session()->forget('kioskIp');
        }

        StaffEntranceExitLog::create([
            'staff_id' => $this->staff->id,
            'type' => $this->type
        ]);
    }
}
