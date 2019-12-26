<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

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
            $table->increments('Id'); 
            $table->char('FirstName', 50)->commnet('ad');
            $table->char('LastName', 50)->commnet('Soyad');
            $table->timestamp('Birthday')->default(null)->commnet('Doğum günü');
            $table->char('Image', 250)->default(null)->nullable()->commnet('Fotoğrafı');
            $table->char('Adress', 250)->default(null)->nullable()->commnet('Adresi');
            $table->char('Password', 250)->default(null)->commnet('Denetim Şifresi');
            $table->char('Telephone', 50)->default(null)->commnet('Telefon');
            $table->char('Gsm', 50)->default(null)->nullable()->commnet('GSM');
            $table->char('Email', 50)->default(null)->nullable()->commnet('Email');
            $table->enum('Gender', ['Unspecified', 'Female', 'Male'])->default('Unspecified')->commnet('Cinsiyeti');
            $table->enum('MartialStatus', ['Unspecified', 'Single', 'Married'])->default('Unspecified')->commnet('Medeni hali');
            $table->char('Lang', 10)->default('en_EN')->nullable();
            $table->bigInteger('Business')->comment('Hangi İşletme');
            $table->bigInteger('Employment')->default(null)->nullable()->comment('Bağlanmış çalışma durumu');
            $table->bigInteger('Career')->default(null)->nullable()->comment('Şu anki çalışma alanı/uzmanlığı.');
            $table->bigInteger('TimeSheetMap')->default(null)->nullable();
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
