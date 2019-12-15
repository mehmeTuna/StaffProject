<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CustomAuth extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Auth', function (Blueprint $table) {
            $table->increments('Id');
            $table->char('Alias', 50)->default(null);
            $table->char('Password', 50)->default(null);
            $table->bigInteger('Business')->default(null);
            $table->integer('Acl')->default(null);
            $table->integer('Staff')->default(null);
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
        Schema::dropIfExists('Auth');

    }
}
