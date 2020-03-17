<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Checkin extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Checkin', function (Blueprint $table) {
            $table->comment = 'Personel Giriş/Çıkış kayıtları.';
            $table->increments('id'); 
            $table->bigInteger('Manager')->default(0)->comment('Notu tutan yetkili');
            $table->bigInteger('Business')->default(0)->comment('Hangi işletme...');
            $table->tinyInteger('Periode')->default(1);
            $table->enum('Traffic', ['Enter', 'Leave'])->default(null);
            $table->char('Notes', 255)->default(null)->comment('İşlem hakkında notlar');
            $table->bigInteger('Signature')->default(0)->comment('Hamgi imza ile işlem yapıldı');
            $table->bigInteger('Session')->default(0)->comment('Hangi oturum');
            $table->bigInteger('Token')->default(0)->comment('Hangi cihaz ile işlem yapıldı. Token tablosunda kayıtlı olan bir jeton ise bu kullanılır aksi durumda yenisi kaydedilir.');
            $table->enum('Status', ['Normal', 'Delayed', 'Escape', 'Authorized'])->default('Normal');
            $table->tinyInteger('Used')->default(0)->comment('31-10-19-12-15 - HEK: Maaş hesabında kullanıldı mı?');
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
        Schema::dropIfExists('Checkin');
    }
}
