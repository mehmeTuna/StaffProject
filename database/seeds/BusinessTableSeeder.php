<?php

use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BusinessTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $faker = Faker::create();

        for($a=0; $a<=1000; $a++):
            $name = $faker->name;
            DB::table('business')->insert([
                'email' => $faker->email,
                'password' => bcrypt(12345),
                'username' => str_slug($name),
                'phone' =>  $faker->phoneNumber,
                'plan_id' => 1,
                'WebPage' => $faker->safeEmailDomain,
                'Image' => $faker->imageUrl(640, 480),
                'address' => $faker->streetAddress,
                'businessName' => $name,
                'data' => '{"currencySymbol":"&#8378;","timeZone":"Europe\/Istanbul","countryCode":"TR","country":"Turkey","currencyCode":"TRY","currencySymbolUtf8":"\u20ba"}',
            ]);
        endfor;
    }
}
