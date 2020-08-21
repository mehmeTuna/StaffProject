<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMinwageTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('minwage', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('active')->default(1)->nullable();
            $table->double('value', 4, 2);
            $table->bigInteger('ageTop');
            $table->bigInteger('ageBottom');
            $table->integer('year');
            $table->timestamps();

            $table->index('id');
            $table->index('active');
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
        Schema::dropIfExists('minwage');
    }
}
