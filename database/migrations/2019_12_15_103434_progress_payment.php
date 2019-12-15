<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ProgressPayment extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ProgressPayment', function (Blueprint $table) {
            $table->comment = 'Hakediş.';
            $table->increments('Id'); 
            $table->bigInteger('Staff')->default(0)->comment('Hangi Çalışan');
            $table->timestamp('DueTime')->default(null)->comment('Ne zaman hak etti.');
            $table->float('Value', 4, 2)->default(0)->comment('Ne kadar hak etti');
            $table->float('Tax', 4, 2)->default(0);
            $table->char('Comment', 255)->default(null)->comment('Açıklamlar.');
            $table->bigInteger('Recompense')->default(0);
            $table->float('Pay', 4, 2)->default(null)->comment('Hizmet karşılığı ücret');
            $table->enum('Factor', ['Hour', 'Day', 'Week', 'Month'])->default('Hour')->comment('Hakedi periyodu');
            $table->tinyInteger('Periode')->default(1)->commnet('Ne kadar zamanda hâk eder? 3600==1 SAAT');
            $table->enum('RoundFactor', ['Second', 'Minute', 'Factor'])->default('Second')->comment('Toplam süre üzerinde yapılan yuvarlama işlemi.');
            $table->bigInteger('TotalSeconds')->default(0)->commnet('Hesap kesimi yapılan toplam süre (sn).');
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
        Schema::dropIfExists('ProgressPayment');
    }
}
