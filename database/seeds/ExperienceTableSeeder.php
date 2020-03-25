<?php

use App\Business;
use Illuminate\Database\Seeder;

class ExperienceTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($counter = 0 ; $counter < 250 ; $counter++)
        {
            $business = Business::all()->random(1);
            $experience = \App\Experience::create([
                "workClass" =>  0,
                'business' => $business[0]->id,
                'identifier' =>  str_random(5),
                'class' => 1 ,
                'periode' => 1,
                'factor' => 1,
                'pay' => 12,
                'workingPlan' => [
                    'monday' => '[{"start":"08:30","end":"17:30"}]',
                    'tuesday' =>'[{"start":"08:30","end":"17:30"}]',
                    'wednesday' => '',
                    'thursday' => '',
                    'friday' => '',
                    'saturday' => '',
                    'sunday' => ''
                ]
            ]);
        }
    }
}
