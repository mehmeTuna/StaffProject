<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Staff extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Staff', function (Blueprint $table) {
            $table->increments('id');
            $table->char('firstName', 50)->commnet('ad');
            $table->char('lastName', 50)->commnet('Soyad');
            $table->boolean('active')->default(1);
            $table->char('loginToken', 200)->commnet('giris tokeni');
            $table->float('balance', 6, 2)->comment('bakiye');
            $table->float('totalPayment', 6, 2)->comment('odenen Toplam ucret');
            $table->float('salary', 6, 2)->comment('ortalama saatlik ucret');
            $table->char('factor', 20);
            $table->float('pay', 6, 2)->comment('satlik alacagi ucret');
            $table->char('periode',20);
            $table->text('workingPlan');
            $table->timestamp('birthday')->default(null)->commnet('Doğum günü');
            $table->char('image', 250)->default(null)->nullable()->commnet('Fotoğrafı');
            $table->char('address', 250)->default(null)->nullable()->commnet('Adresi');
            $table->char('password', 250)->default(null)->commnet('Denetim Şifresi');
            $table->char('telephone', 50)->default(null)->commnet('Telefon');
            $table->char('gsm', 50)->default(null)->nullable()->commnet('GSM');
            $table->char('email', 50)->default(null)->nullable()->commnet('email');
            $table->enum('gender', ['Unspecified', 'Female', 'Male'])->default('Unspecified')->commnet('Cinsiyeti');
            $table->enum('martialStatus', ['Unspecified', 'Single', 'Married'])->default('Unspecified')->commnet('Medeni hali');
            $table->char('lang', 10)->default('en_EN')->nullable();
            $table->bigInteger('experience');
            $table->bigInteger('business')->comment('Hangi İşletme');
            $table->bigInteger('employment')->default(null)->nullable()->comment('Bağlanmış çalışma durumu');
            $table->bigInteger('career')->default(null)->nullable()->comment('Şu anki çalışma alanı/uzmanlığı.');
            $table->bigInteger('timeSheetMap')->default(null)->nullable();
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
        Schema::dropIfExists('Staff');
    }
}
