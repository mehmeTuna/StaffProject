<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateKioskTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kiosk', function (Blueprint $table) {
            $table->comment = "G/ç denetimde kullanılanılacak cihaz tanımı";
            $table->increments('Id');
            $table->char ("Identifier", 255)->default(null);
            $table->char("RemoteAddress", 80)->default(null);
            $table->char("Comment", 80)->default(null);
            $table->bigInteger ("Business");
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
        Schema::dropIfExists('kiosk');
    }
}
