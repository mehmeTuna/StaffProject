<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tio', function (Blueprint $table) {
            $table->increments('id');
            $table->bigInteger('kioskId')->comment('kiosk id');
            $table->bigInteger('staff')->comment('staff id');
            $table->bigInteger('business')->comment('business id');
            $table->boolean('active')->default(1)->comment('varsayilan aktif olup olamdigi kontrol edilen kolon');
            $table->integer('link')->nullable()->default(1)->comment('IF("Enter",Leave._Id,IF("Leave",Enter._Id,NULL))');
            $table->char('comment', 191)->nullable()->comment('odeme islemi icin yapilan yorumlar bu kisima eklenecek');
            $table->integer('tolerance')->nullable()->default(600)->comment('saniye');
            $table->enum('traffic', ['Enter','Leave'])->nullable()->default('Enter')->comment('"Enter","Leave"');
            $table->timestamps();

            $table->index('id');
            $table->index('active');
            $table->index('staff');
            $table->index('kioskId');
            $table->index('business');
            $table->index('traffic');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tio');
    }
}
