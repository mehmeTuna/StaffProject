<?php

namespace App\Http\Controllers;

use App\Events\KioskEvent;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public $kioskCookieName = '_k';
    public $staffCookieName = '_s';
    public $iplearnApi = 'http://www.geoplugin.net/php.gp';

    public function oneYearCookieTime()
    {
        return time() + 31556926;
    }

    public function respondSuccess($data = [])
    {
        return response()->json([
            'status' => true,
            'text' => trans('auth.success'),
            'data' => $data,
        ]);
    }

    public function respondFail($data = [])
    {
        return response()->json([
            'status' => false,
            'text' => trans('auth.error'),
            'data' => $data,
        ]);
    }

    public function incorrectPassword($data = [])
    {
        return response()->json([
            'status' => false,
            'text' => trans('auth.incorrectPassword'),
            'data' => $data,
        ]);
    }

    public function learnGeoPlugin($ip)
    {
        if (env('APP_ENV') == 'local') {
            $result = (object) [];
            $result->geoplugin_request = $ip;
            $result->geoplugin_status = 200;
            $result->geoplugin_city = '';
            $result->geoplugin_countryCode = 'TR';
            $result->geoplugin_countryName = 'Turkey';
            $result->geoplugin_latitude = '';
            $result->geoplugin_longitude = '';
            $result->geoplugin_timezone = 'Europe/Istanbul';
            $result->geoplugin_currencyCode = 'TRY';
            $result->geoplugin_currencySymbol = '&#8378;';
            $result->geoplugin_currencySymbol_UTF8 = '₺';
            return $result;
        }

        $client = new \GuzzleHttp\Client();

        $response = $client->request('GET', $this->iplearnApi . '?ip=' . $ip);

        $statusCode = $response->getStatusCode();
        $content = $response->getBody();

        if ($statusCode != 200) {
            log::info('ip is location learn failed ip:' . $ip);
        }

        return (object) unserialize($content);
    }

    public function kioskQrRegenerate($kiosk)
    {
        $code = str_random(20);
        Cache::put($code, $kiosk->remoteAddress, Carbon::now()->addMinutes(5));

        event(new KioskEvent([
            'kioskId' =>  $kiosk->remoteAddress,
            'isLogin' => true,
            'business' => $kiosk->getBusiness,
            'refreshQrCode' => env('APP_URL').'/kiosk/staff/'.$code,
        ]));

        return $code ;
    }

}
