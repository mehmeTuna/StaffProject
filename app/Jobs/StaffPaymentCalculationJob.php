<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Staff;
use App\Kiosk;
use App\Tio;

class StaffPaymentCalculationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $staff ;
    protected $kiosk ;
    protected $transactionTime ;
    protected $newBalance;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Staff $staff, Kiosk $kiosk, $transactionTime)
    {
        $this->staff = $staff ;
        $this->kiosk = $kiosk ;
        $this->transactionTime = $transactionTime ;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $newTio = Tio::create([
            'staff' => $this->staff->id,
            'kioskId' => $this->kiosk->remoteAddress,
            'traffic' => $this->staff->online ? 'Leave' : 'Enter',
            'business' => $this->staff->business,
        ]);

        //TODO: bu kisim staff e ait giris cikislarda fiyat hesaplamasi yapar daha makul bir cozum bul
        if($this->staff->online){
            $tio = Tio::where('staff', $this->staff->id)->orderBy('created_at', 'desc')->first();

            $difference = $this->transactionTime - $tio->created_at->timestamp;
            $multiplier = $this->staff->salary * ($difference / 3300);
            $oldBalance = $this->staff->balance;
            $this->newBalance = round(($oldBalance + $multiplier), 2);
        }

        $this->newBalance = 200 ;

        $updatedStaff = Staff::where('id', $this->staff->id)->update([
            'balance' => 200, //$this->staff->online ? $this->newBalance : $this->staff->balance,
            'online' => $this->staff->online ? 0 : 1,
        ]);
    }
}
