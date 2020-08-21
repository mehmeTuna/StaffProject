<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCheckinTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('checkin', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('manager')->default(0)->nullable()->comment('Notu tutan yetkili');
            $table->integer('business')->default(0)->nullable()->comment('Hangi işletme...');
            $table->tinyInteger('periode')->default(1)->nullable();
            $table->enum('traffic', ['Enter', 'Leave'])->default('Enter')->nullable();
            $table->char('notes')->nullable()->comment('İşlem hakkında notlar');
            $table->integer('signature')->nullable()->default()->commenet('Hamgi imza ile işlem yapıldı');
            $table->integer('session')->nullable()->comment('Hangi oturum');
            $table->integer('token')->nullable()->comment('Hangi cihaz ile işlem yapıldı. Token tablosunda kayıtlı olan bir jeton ise bu kullanılır aksi durumda yenisi kaydedilir.');
            $table->enum('status', ['Normal', 'Delayed', 'Escape', 'Authorized'])->default('Normal')->nullable();
            $table->tinyInteger('used')->default(0)->nullable()->comment('31-10-19-12-15 - HEK: Maaş hesabında kullanıldı mı?');
            $table->timestamps();

            $table->index('manager');
            $table->index('business');
            $table->index('periode');
            $table->index('traffic');
            $table->index('session');
            $table->index('status');
            $table->index('used');
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
        Schema::dropIfExists('checkin');
    }
}
