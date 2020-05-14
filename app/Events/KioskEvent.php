<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class KioskEvent extends Event implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $data;

    /**
     * Create a new event instance.
     *
     * @param $data
     */
    public function __construct($data = '')
    {
        $this->data = $data ;
        $this->dontBroadcastToCurrentUser();
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('create');
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
