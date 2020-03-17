<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

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
            $table->increments('id');
            $table->bigInteger('businessId')->default(0);
            $table->bigInteger('experience')->default(0);
            $table->bigInteger('staff')->default(0);
            $table->boolean('active')->default(1)->comment('aktif kolon');
            $table->tinyInteger('workClass')->default(0)->comment('0=Serbest çalışma,1=Planlı çalışma, 2=Aylık sabit ücret.');
            $table->char('endTime')->default(null)->comment('Bu kariyerin bitiş zamanı.');
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
