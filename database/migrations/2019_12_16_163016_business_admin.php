<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class BusinessAdmin extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('BusinessAdmin', function (Blueprint $table) {
            $table->comment = 'Business admin tablosu.';
            $table->increments('Id');
            $table->bigInteger ('business');
            $table->longText('Options');
            $table->longText('Data');
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
        Schema::dropIfExists('BusinessAdmin');
    }
}
