<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCargeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('charge', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('manager')->default(0)->comment('Kim ayarladi');
            $table->integer('business')->default(0)->comment('Hangi Isletme');
            $table->dateTime('adjustTime')->nullable()->comment('Ne zaman Ayarlandi ?');
            $table->tinyInteger('periode')->default(1)->nullable();
            $table->enum('factor', ['Hour', 'Day', 'Week', 'Month'])->default('Day')->nullable();
            $table->double('pay', 4,2)->comment('Ne kadar ?');
            $table->integer('experience')->default(0)->comment('Hangi gorev icin ?');
            $table->timestamps();

            $table->index('id');
            $table->index('manager');
            $table->index('business');
            $table->index('periode');
            $table->index('factor');
            $table->index('pay');
            $table->index('experience');
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
        Schema::dropIfExists('charge');
    }
}
