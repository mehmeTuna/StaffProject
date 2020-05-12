<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class KioskEvent implements ShouldBroadcast
{
    use SerializesModels;

    public $data;

    /**
     * Create a new event instance.
     *
     * @param $data
     */
    public function __construct($data)
    {
        $this->data = $data ;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('kiosk.'.$this->data);
    }

    /**

     * The event's broadcast name.

     *

     * @return string

     */

    public function broadcastAs()

    {
        return 'KioskEvent';
    }


    public function broadcastWith()
    {
        return [
            'isUsedCode' => true,
            'refreshQr' => true
        ];
    }
}