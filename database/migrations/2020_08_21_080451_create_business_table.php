<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBusinessTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('business', function (Blueprint $table) {
            $table->increments('id')->comment('business unique id');
            $table->char('email', 191)->comment('business email. Marketing send email');
            $table->char('password', 191)->comment('business password');
            $table->char('username', 191)->comment('business kullanici adi. username slug edilmis hali');
            $table->char('phone', 191)->comment('business e ait iletisim numarasi');
            $table->boolean('active')->nullable()->default(1)->comment('business in aktif olup olmadigi');
            $table->integer('plan_id')->comment('bagli oldugu plan id');
            $table->char('webPage', 191)->nullable()->comment('business web site');
            $table->char('image', 191)->nullable()->comment('business gorseli');
            $table->double('longitute', 10, 6)->nullable()->comment('eksenler');
            $table->double('latitude', 10, 6)->nullable()->comment('eksenler');
            $table->string('address')->nullable()->comment('business adres');
            $table->char('businessName', 191)->comment('business adi');
            $table->longText('options')->nullable()->comment('business a ait ayarlarin tutuldugu kisim');
            $table->longText('data')->nullable()->comment('business a ait verilerin json formatinda tutuldugu kisim');
            $table->longText('experienceData')->nullable()->comment('experience a ait verilerin json formatinda tutuldugu kisim');
            $table->longText('staffData')->nullable()->comment('staff e ait verilerin json formatinda tutuldugu kisim');
            $table->longText('kioskData')->nullable()->comment('kiosk a ait verilerin json formatinda tutuldugu kisim');
            $table->dateTime('packageTime')->nullable()->comment('sahip oldugu paketin son gecerlilik tarihi');
            $table->dateTime('lastLoginTime')->nullable()->comment('business en zon ne zaman giris yapti');
            $table->rememberToken();
            $table->timestamps();

            $table->unique('email');
            $table->unique('username');

            $table->index('id');
            $table->index('email');
            $table->index('username');
            $table->index('active');
            $table->index('plan_id');
            $table->index('businessName');
            $table->index('packageTime');
            $table->index('lastLoginTime');
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
        Schema::dropIfExists('business');
    }
}
