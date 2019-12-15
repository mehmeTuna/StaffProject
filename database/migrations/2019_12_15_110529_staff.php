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
            $table->char('ForeName', 50)->default(null)->commnet('İlk adı');
            $table->char('MiddleName', 50)->default(null)->commnet('İkinci adı');
            $table->char('LastName', 50)->default(null)->commnet('Soyadı ');
            $table->timestamp('Birthday')->default(null)->commnet('Doğum günü');
            $table->char('Image', 250)->default(null)->commnet('Fotoğrafı');
            $table->char('Adress', 250)->default(null)->commnet('Adresi');
            $table->char('Password', 250)->default(null)->commnet('Denetim Şifresi');
            $table->char('Telephone', 50)->default(null)->commnet('Telefon');
            $table->char('Gsm', 50)->default(null)->commnet('GSM');
            $table->char('Email', 50)->default(null)->commnet('Email');
            $table->enum('Gender', ['Unspecified', 'Female', 'Male'])->default('Unspecified')->commnet('Cinsiyeti');
            $table->enum('MartialStatus', ['Unspecified', 'Single', 'Married'])->default('Unspecified')->commnet('Medeni hali');
            $table->char('Lang', 10)->default('en_EN');
            $table->bigInteger('Business')->default(0)->comment('Hangi İşletme');
            $table->bigInteger('Employment')->default(0)->comment('Bağlanmış çalışma durumu');
            $table->bigInteger('Career')->default(0)->comment('Şu anki çalışma alanı/uzmanlığı.');
            $table->bigInteger('TimeSheetMap')->default(0);
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
