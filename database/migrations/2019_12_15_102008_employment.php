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
            $table->increments('id');
            $table->bigInteger('business')->default(0)->comment('Hangi işletme...');
            $table->bigInteger('staff')->default(0)->comment('Hangi çalışan');
            $table->boolean('active')->default(1);
            $table->char('comment', 255)->default(null)->comment('İşlem hakkında notlar');
            $table->enum('status', ['Recruitment', 'Dismiss'])->default(null)->comment('Durum: İşe alma/işten çıkarma');
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
