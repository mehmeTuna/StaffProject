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
            $table->increments('id');
            $table->char('identifier', 191);
            $table->boolean('active')->nullable()->default(1)->comment('kiosk in aktif olup olmadigi');
            $table->char('remoteAddress', 191)->comment('cookie adresi');
            $table->char('comment', 191)->comment('yorum');
            $table->integer('business')->default(0)->nullable()->comment('Hangi işletme...');
            $table->timestamps();

            $table->index('id');
            $table->index('active');
            $table->index('remoteAddress');
            $table->index('business');
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
        Schema::dropIfExists('kiosk');
    }
}
