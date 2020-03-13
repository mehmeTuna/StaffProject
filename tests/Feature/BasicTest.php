<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class BasicTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
        $this->assertTrue(true);
    }

    public function testHome()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function testNotFound()
    {
        $response = $this->get('404');

        $response->assertStatus(200);
    }

    public function testKioskRegisterPage()
    {

        $response = $this->get('kiosk');

        $response->assertStatus(200);
    }

    public function testBusinessLoginPage()
    {
        $response = $this->get('login');

        $response->assertStatus(200);
    }

    public function testStaffHomePage()
    {
        $response = $this->get('staff/home');

        $response->assertStatus(200);
    }

    public function testStaffLoginPage()
    {
        $response = $this->get('staff/login');

        $response->assertStatus(200);
    }

    public function testStaffMe()
    {
        $response = $this->withSession(['staff' => 6])
            ->post('staff/me');

        $response ->assertStatus(200)
            ->assertJson([
                ['status' => true]
            ]);
    }

    public function testStaffLogout()
    {
        $response = $this->withSession(['staff' => 6])
            ->post('staff/logout');

        $response->assertStatus(200); //simdilik 200 donmesi yeterli
    }

    public function testKioskStafflogin()
    {
        $response = $this->json('POST', 'kiosk/staff/login', ['username' => 'tuna@hotmail.com', 'password' => '12345']);

        $response
            ->assertStatus(200)
            ->assertJson([
                'status' => false,
            ]);
    }
}
