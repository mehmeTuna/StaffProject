<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

use Faker\Factory as Faker;

class BusinessTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $faker = Faker::create ();

        DB::table('business')->insert([
            'Email' => $faker->email,
            'WebPage' => $faker->safeEmailDomain,
            'Image' => $faker->imageUrl( 640, 480),
            'Longitute' => $faker->longitude( -180, 180),
            'Latitude' => $faker->latitude( -90, 90),
            'Address' => $faker->streetAddress,
            'CompanyName' => $faker->company,
            'Options' => json_encode ([]),
            'Data' => json_encode ([]),
        ]);
    }
}
