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
        Schema::create('Business', function (Blueprint $table) {
            $table->comment = 'İşletme';
            $table->increments('Id');
            $table->char('Email', 255);
            $table->text('WebPage')->default(null);
            $table->char('Image', 150)->default(null)->comment('Görseli'); 
            $table->double('Longitute', 8, 8)->default(0)->comment('Boylamı');
            $table->double('Latitude', 8, 8)->default(0)->comment('Enlemi');
            $table->text('Address')->default(null)->comment('Adresi');
            $table->text('CompanyName')->default(null)->comment('İşletmenin/Şirketin adı.');
            $table->longText('Options');
            $table->longText('Data');
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
