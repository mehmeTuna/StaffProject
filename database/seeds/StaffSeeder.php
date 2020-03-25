<?php

use Illuminate\Database\Seeder;

class StaffSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($counter = 0 ; $counter < 250; $counter++)
        {
            $business = \App\Business::all()->random(1);
            $experience = \App\Experience::all()->random(1);
            $staff = \App\Staff::create([
                "firstName" => str_random(5),
                "lastName" => str_random(5),
                "birthday" => '01.01.1999',
                'password' => bcrypt(12345),
                "image" => '',
                "address" => str_random(5),
                "telephone" => '5454102145',
                "gsm" => '5454102145',
                "email" => str_random(6).'@hotmail.com',
                "gender" => 'unspecified',
                "martialStatus" => 'unspecified',
                "business" => 1,
                "employment" => 1,
                "timeSheetMap" => 1,
                'workingPlan' => '[]',
                'experience' =>$experience[0]->id ,
                'factor' => 1,
                'pay' => 12,
                'periode' => 1,
                'salary' => 12,
            ]);
        }
    }
}
