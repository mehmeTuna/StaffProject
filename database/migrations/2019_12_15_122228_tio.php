<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Tio extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Tio', function (Blueprint $table) {
            $table->comment = 'Giriş/Çıkış zaman planları.';
            $table->increments('id');
            $table->bigInteger('staff');
            $table->bigInteger('business');
            $table->char('kioskId', 255);
            $table->integer('link')->default(0)->comment('IF("Enter",Leave._Id,IF("Leave",Enter._Id,NULL))');
            $table->char('comment', 255)->default(null);
            $table->integer('tolerance')->default(600)->comment('Saniye');
            $table->enum('traffic', ['Enter', 'Leave'])->default('Enter')->comment('"Enter","Leave"');
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
        Schema::dropIfExists('Tio');
    }
}
