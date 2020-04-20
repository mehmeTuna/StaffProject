<?php

namespace Tests\Unit;

use App\Business;
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

}
