<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Shift extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Shift', function (Blueprint $table) {
            $table->comment = 'Vardiya başlangıç bitiş saatleri.';
            $table->increments('Id'); 
            $table->bigInteger('Business')->default(0);
            $table->bigInteger('Relay')->default(0);
            $table->boolean('Enabled')->default(1);
            $table->char('BeginTime', 20)->default(null);
            $table->char('EndTime', 20)->default(null);
            $table->char('Identifier', 50)->default(null);
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
        Schema::dropIfExists('Shift');
    }
}
