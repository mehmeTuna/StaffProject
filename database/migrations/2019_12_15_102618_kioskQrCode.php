<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Kioskqrcode extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Kioskqrcode', function (Blueprint $table) {
            $table->comment = 'Tanımlanmış kiosklar.';
            $table->increments('id');
            $table->char('code', 200)->comment('code');
            $table->boolean('active')->default(1);
            $table->char('ip', 150)->comment('cookie adresi');
            $table->char('comment', 200)->comment('yorum');
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
        Schema::dropIfExists('Kioskqrcode');
    }
}
