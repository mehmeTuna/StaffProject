<?php

namespace App\Http\Middleware;

use Closure;

use App\Kiosk;

class KioskMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        $kioskIpAddress  = $request->ip();
        $kiosk = Kiosk::where('RemoteAddress', $kioskIpAddress)->get();

        if(!isset($kiosk[0]))
        {
            return redirect('/kiosk/ekle');
        }

        return $next($request);
    }
}
