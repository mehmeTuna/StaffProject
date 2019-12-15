<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Tio extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Tio', function (Blueprint $table) {
            $table->comment = 'Giriş/Çıkış zaman planları.';
            $table->increments('Id'); 
            $table->bigInteger('TimeSheet')->default(0);
            $table->integer('Link')->default(0)->comment('IF("Enter",Leave._Id,IF("Leave",Enter._Id,NULL))');
            $table->char('Comment', 255)->default(null);
            $table->enum('ToleransStyle', ['Before', 'Between', 'After'])->default(null)->comment('"Befor","Between","After"');
            $table->integer('Tolerance')->default(600)->comment('Saniye');
            $table->timestamp('Hour')->default(null);
            $table->enum('Traffic', ['Enter', 'Leave'])->default('Enter')->comment('"Enter","Leave"');
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
        Schema::dropIfExists('Tio');
    }
}
