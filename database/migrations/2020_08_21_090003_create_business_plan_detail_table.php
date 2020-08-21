<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBusinessPlanDetailTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('business_plan_detail', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('day')->default(1)->nullable();
            $table->float('price', 4, 2);
            $table->string('name');
            $table->integer('staff_count')->default(1)->nullable();
            $table->integer('experience_count')->default(1)->nullable();
            $table->integer('kiosk_count')->default(1)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('business_plan_detail');
    }
}
