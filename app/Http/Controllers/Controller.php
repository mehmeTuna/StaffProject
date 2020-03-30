<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Log;

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
        if (\App::environment('local')) {
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
        return json_decode(unserialize($content));
    }

}
