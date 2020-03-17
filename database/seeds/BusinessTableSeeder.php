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

        DB::table('business')->insert([
            'email' => $faker->email,
            'WebPage' => $faker->safeEmailDomain,
            'Image' => $faker->imageUrl(640, 480),
            'longitute' => $faker->longitude(-180, 180),
            'latitude' => $faker->latitude(-90, 90),
            'Address' => $faker->streetAddress,
            'CompanyName' => $faker->company,
            'options' => json_encode([]),
            'data' => json_encode([]),
        ]);
    }
}
