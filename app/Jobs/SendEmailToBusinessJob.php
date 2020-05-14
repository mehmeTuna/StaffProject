<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Mail\BusinessRegisterEmail;
use Mail;

class SendEmailToBusinessJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $data ;

    /**
     * Create a new job instance.
     *
     * @param $data
     */
    public function __construct($data = '')
    {
        $this->data = $data ;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $email = new BusinessRegisterEmail();
        Mail::to($this->data)->send($email);
    }
}
