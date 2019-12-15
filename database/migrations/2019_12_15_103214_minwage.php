<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Minwage extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Minwage', function (Blueprint $table) {
            $table->comment = 'Yıllara göre asgari ücret tablosu.';
            $table->increments('Id'); 
            $table->float('Value', 4,2)->default(null);
            $table->bigInteger('AgeTop')->default(null);
            $table->bigInteger('AgeBottom')->default(null);
            $table->bigInteger('Year')->default(null);
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
        Schema::dropIfExists('Minwage');
    }
}
