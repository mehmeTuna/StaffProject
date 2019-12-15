<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Relay extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Relay', function (Blueprint $table) {
            $table->increments('Id'); 
            $table->char('Comment', 255)->default(null);
            $table->timestamp('ExpireTime')->default(null);
            $table->boolean('Active')->default(1);
            $table->bigInteger('Business')->default(null);
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
        Schema::dropIfExists('Relay');
    }
}
