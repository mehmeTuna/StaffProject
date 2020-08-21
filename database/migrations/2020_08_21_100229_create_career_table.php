<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCareerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('career', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('businessId')->default(0)->comment('business id');
            $table->integer('experience')->default(0)->comment('experience id');
            $table->integer('staff')->default(0)->comment('staff id');
            $table->boolean('active')->nullable()->default(1)->comment('aktif olup olmadigi');
            $table->tinyInteger('workClass')->nullable()->default(0)->comment('0=Serbest çalışma,1=Planlı çalışma, 2=Aylık sabit ücret.');
            $table->dateTime('endTime')->nulable()->comment('Bu kariyerin bitiş zamanı.');
            $table->timestamps();

            $table->index('businessId');
            $table->index('experience');
            $table->index('staff');
            $table->index('active');
            $table->index('workClass');
            $table->index('endTime');
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
        Schema::dropIfExists('career');
    }
}
