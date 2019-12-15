<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Employment extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Employment', function (Blueprint $table) {
            $table->comment = 'İşe alınma - işten çıkarılma kayıtları.';
            $table->increments('Id'); 
            $table->bigInteger('Manager')->default(0)->comment('İşe alım/İşten çıkarma işlemini kim yaptı.	');
            $table->bigInteger('Business')->default(0)->comment('Hangi işletme...');
            $table->char('Comment', 255)->default(null)->comment('İşlem hakkında notlar');
            $table->dateTime('OperationTime')->default(null)->comment('Ne zaman?');
            $table->enum('Status', ['Recruitment', 'Dismiss'])->default(null)->comment('Durum: İşe alma/işten çıkarma');
            $table->bigInteger('Staff')->default(0)->comment('Hangi çalışan');
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
        Schema::dropIfExists('Employment');
    }
}
