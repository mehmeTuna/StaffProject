<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

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
            $table->comment = 'İşletme tablosu';
            $table->increments('id');
            $table->char('email', 255);
            $table->char('password', 255);
            $table->char('username', 100);
            $table->char('phone', 50);
            $table->boolean('active')->default(1);
            $table->text('webPage')->default(null)->nullable();
            $table->char('image', 150)->default(null)->nullable()->comment('Görseli');
            $table->float('longitute', 10, 6)->default(null)->nullable()->comment('Boylamı');
            $table->float('latitude', 10, 6)->default(null)->nullable()->comment('Enlemi');
            $table->text('address')->default(null)->comment('Adresi');
            $table->text('businessName')->comment('İşletmenin/Şirketin adı.');
            $table->longText('options')->default(null)->nullable();
            $table->longText('data')->default(null)->nullable();
            $table->text('experienceData')->comment('Experience datalari');
            $table->text('staffData')->comment('staff datalari');
            $table->text('kioskData')->comment('Kiosk datalari');
            $table->char('packageTime', 20)->comment('Paketi icin son gecerlilik tairihi');
            $table->char('lastLoginTime', 20)->comment('Son giris tarihi');
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
