<?php

namespace Tests\Unit;

use App\Business;
use App\Experience;
use Tests\TestCase;
use Faker\Factory ;

class BusinessControllerTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function testBusinessLogin()
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
    }

    public function testLogin()
    {
        $business = Business::all()->random()->first();

        $response = $this->postJson('/business/loginData', [
            'username' => $business->email,
            'password' => $business->email
        ]);

        $response->assertStatus(200)
            ->assertJson([
               'status' => false,
               'text' => trans('auth.incorrectPassword'),
                'data' => []
            ]);
    }

    public function testRegister()
    {
        $faker = Factory::create();
        $name = $faker->name ;
        $slug = str_slug($name);
        $response = $this->postJson('/business/register', [
            'email' => $faker->email,
            'businessName' => $name,
            'telephone' => $faker->phoneNumber,
            'password' => bcrypt(12345),
        ]);

        $response->assertRedirect("/{$slug}");
    }

    public function testGetData()
    {
        $business = Business::all()->random(1)->first();
        $response = $this->withSession([
            'businessId' => $business->id
        ])->post('/business/data');

        $response->assertStatus(200)
            ->assertJson([
                'status' => true,
                'text' => trans('auth.success'),
                'data' => [
                    "email" => $business->email,
                    "username" => $business->username,
                    "img" => $business->image,
                    "name" => $business->businessName,
                    "staff" => $business->staff->count(),
                    "experience" => $business->experience->count(),
                    'businessName' => $business->businessName,
                    'address' => $business->address,
                    'webPage' => $business->webPage,
                    'phone' => $business->phone,
                    'country' => $business->data->country,
                    'currencySymbolUtf8' => $business->data->currencySymbolUtf8,
                    'currencySymbol' => $business->data->currencySymbol,
                ]
            ]);
    }

    public function testUpdate()
    {
        //TODO: bu kisimda business data update kismi
    }

    public function testLogout()
    {
        $business = Business::all()->random(1)->first();

        $response = $this->withSession([
            'businessId' => $business->id
        ])->post('/business/logout');

        $response->assertStatus(200)
            ->assertJson([
                'status' => true,
                'text' => trans('auth.success'),
                'data' => []
            ]);
    }

    public function testStaffList()
    {
        //TODO: herhangi bir staff var ise o kisim icin frontende gorunmesi gereken datalari ekleyerek test tekrar edilmeli
        $factorText = [
            'hour' => 'hourly',
            'week' => 'weekly',
            'month' => 'monthly',
        ];

        $business = Business::all()->random(1)->first();

        $response = $this->withSession([
            'businessId' => $business->id
        ])->post('/business/staff/list');

        if($business->staff->count() > 0 ){
            $data= [];
            foreach ($business->staff as $staff){
                $data = $staff;
                $data->currencySymbol = $business->currencySymbolUtf8;
                $data->online = $staff->online;
                $experience = $staff->experinceData ;
                $data->experience = $experience->identifier;
                $data->factor = $data->periode > 1 ? $data->periode . ' ' : ' ' . (isset($factorText[$data->factor]) ? $factorText[$data->factor] : 'hourly') . ' ' . $data->pay;
                return $data;
            }
            $staff = $business->staff->map(function ($user) use ($business, $factorText) {
                $data = $user;
                $data->currencySymbol = $business->currencySymbolUtf8;
                $data->online = $user->online;
                $experience = Experience::where('id', $data->experience)->first();
                $data->experience = $experience->identifier;
                $data->factor = $data->periode > 1 ? $data->periode . ' ' : ' ' . (isset($factorText[$data->factor]) ? $factorText[$data->factor] : 'hourly') . ' ' . $data->pay;
                return $data;
            });
            $response->assertStatus(200)
                ->assertJson([
                    'status' => true,
                    'text' => trans('auth.success'),
                    'data' => $staff,
            ]);
        }else {
            $response->assertStatus(200)
                ->assertJson([
                    'status' => true,
                    'text' => trans('auth.success'),
                    'data' => [],
                ]);
        }
    }

    public function testStaffPaymentHistory()
    {
        $business = Business::all()->random(1)->first();
        if($business->staff->count() > 0){
            $response = $this->withSession([
                'businessId' => $business->id
            ])->post('/business/staff/payment/history',[
                'userId'
            ]);

            foreach ($business->staff as $staff){
                if($staff->paymentHistory->count() > 0 ){
                    $data = [];
                    foreach ($staff->paymentHistory as $value){
                        $response = (object)[];
                        $response->amount = $value->pay .' '. $value->businessOwner->data->currencySymbolUtf8;
                        $response->comment = $value->comment ;
                        $response->date = $value->created_at->toDateString();
                        $data[] = $response ;
                    }
                    $response->assertStatus(200)
                        ->assertJson([
                            'status' => true,
                            'text' => trans('auth.success'),
                            'data' => $data,
                        ]);
                }else{
                    $response->assertStatus(200)
                        ->assertJson([
                            'status' => true,
                            'text' => trans('auth.success'),
                            'data' => [],
                        ]);
                }
            }
        }
    }

    public function testStaffLogHistory()
    {
        $business = Business::all()->random(2)->first();

    if($business->staff->count() > 0){
        $response = $this->withSession([
            'businessId' => $business->id
        ])->post('/business/staff/log/history',[
            'userId'
        ]);

        foreach ($business->staff as $staff){
            if($staff->logHistory->count() > 0 ){
                $data = [];
                foreach ($staff->logHistory as $value){
                    $response = (object)[];
                    $response->type = $value->traffic ;
                    $response->comment = $value->comment ;
                    $response->date = $value->created_at->toDateString();
                    $data[] = $response ;
                }
                $response->assertStatus(200)
                    ->assertJson([
                        'status' => true,
                        'text' => trans('auth.success'),
                        'data' => $data,
                    ]);
            }else{
                $response->assertStatus(200)
                    ->assertJson([
                        'status' => true,
                        'text' => trans('auth.success'),
                        'data' => [],
                    ]);
            }
        }
    }
    }

    public function testStaffPay()
    {
        $business = Business::all()->random(1)->first();

        $response = $this->withSession([
            'businessId' => $business->id
        ])->post('/business/staff/pay');
    }

}
