<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Career extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Career', function (Blueprint $table) {
            $table->increments('Id'); 
            $table->bigInteger('Recompense')->default(0);
            $table->bigInteger('Experience')->default(0);
            $table->bigInteger('Staff')->default(0);
            $table->tinyInteger('WorkClass')->default(0)->comment('0=Serbest çalışma,1=Planlı çalışma, 2=Aylık sabit ücret.');
            $table->dateTime('BeginTime')->default(null)->comment('Bu kariyerin başlangıç zamanı.');
            $table->dateTime('EndTime')->default(null)->comment('Bu kariyerin bitiş zamanı.');
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
        Schema::dropIfExists('Career');
    }
}
