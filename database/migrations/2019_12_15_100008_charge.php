<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Charge extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Charge', function (Blueprint $table) {
            $table->comment = 'İş tanımına göre, ücret ve periyot tanımları.';
            $table->increments('id'); 
            $table->bigInteger('Manager')->default(0)->comment('Kim ayarladı?');
            $table->bigInteger('Business')->default(0)->comment('Hangi işletme...');
            $table->dateTime('AdjustTime')->default(null)->comment('Ne zaman ayarlandı?');
            $table->tinyInteger('Periode')->default(1);
            $table->enum('Factor', ['Hour', 'Day', 'Week', 'Month'])->default('Day');
            $table->float('Pay', 6, 2)->default(0)->comment('Ne kadar ?');
            $table->bigInteger('Experience')->default(0)->comment('Hangi görev İçin');
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
        Schema::dropIfExists('Charge');
    }
}
