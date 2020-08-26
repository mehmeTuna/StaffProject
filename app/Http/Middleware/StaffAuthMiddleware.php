<?php

namespace App\Http\Middleware;

use Closure;
use App\Staff;

class StaffAuthMiddleware
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
        $staff = Staff::where('loginToken', $request->cookie('_s'))->first();

        if($staff == null){
            return redirect('staff/login');
        }
        
        return $next($request);
    }
}
