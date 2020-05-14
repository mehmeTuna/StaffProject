<?php

namespace App\Jobs;

use App\Mail\StaffRegisterEmail;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class SendEmailToStaffJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected  $data  ;

    /**
     * Create a new job instance.
     *
     * @param string $data
     */
    public function __construct($data = '')
    {
        $this->data = $data;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $email = new StaffRegisterEmail();
        Mail::to($this->data)->send($email);
    }
}
