<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Kiosk extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Kiosk', function (Blueprint $table) {
            $table->comment = 'Tanımlanmış kiosklar.';
            $table->increments('id');
            $table->char('identifier', 20)->comment('adi');
            $table->boolean('active')->default(1);
            $table->char('remoteAddress', 150)->comment('cookie adresi');
            $table->char('comment', 200)->comment('yorum');
            $table->bigInteger('business')->default(0)->comment('Hangi işletme');
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
        Schema::dropIfExists('Kiosk');
    }
}
