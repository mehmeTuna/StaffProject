<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Recompense extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Recompense', function (Blueprint $table) {
            $table->comment = 'Yıllara göre asgari ücret tablosu.';
            $table->increments('Id'); 
            $table->bigInteger('Manager')->default(0)->comment('Kim belirledi');
            $table->bigInteger('Business')->default(0)->comment('Hangi işletme');
            $table->bigInteger('Staff')->default(0);
            $table->bigInteger('Career')->default(0)->comment('Hangi kariyer için');
            $table->char('Comment', 255)->default(null)->comment('Herhangi bir not.');
            $table->tinyInteger('Periode')->default(1)->commnet('Ne kadar zamanda hâk eder? 3600==1 SAAT');
            $table->enum('Factor', ['Hour', 'Day', 'Week', 'Month'])->default('Hour');
            $table->float('Pay', 4, 2)->default(0)->commnet('Hizmet karşılığı ücret');
            $table->timestamp('AdjustTime')->default(null)->commnet('Ne zaman belirlendi ?');
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
        Schema::dropIfExists('Recompense');
    }
}
