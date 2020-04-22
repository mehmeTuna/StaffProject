<?php

namespace App\Http\Middleware;

use Closure;

class BusinessAuthMiddleware
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
        if(!session()->has('businessId'))
        {
            return redirect('/');
        }
        
        return $next($request);
    }
}