<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Business extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('business', function (Blueprint $table) {
            $table->comment = 'İşletme';
            $table->increments('Id');
            $table->char('Email', 255);
            $table->char('Username', 100);
            $table->char('Phone', 50);
            $table->boolean('Active')->default(1);
            $table->text('WebPage')->default(null)->nullable();
            $table->char('Image', 150)->default(null)->nullable()->comment('Görseli'); 
            $table->float('Longitute', 10, 6)->default(null)->nullable()->comment('Boylamı');
            $table->float('Latitude', 10, 6)->default(null)->nullable()->comment('Enlemi');
            $table->text('Address')->default(null)->comment('Adresi');
            $table->text('BusinessName')->comment('İşletmenin/Şirketin adı.');
            $table->longText('Options')->default(null)->nullable();
            $table->longText('Data')->default(null)->nullable();
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
        Schema::dropIfExists('Business');
    }
}
