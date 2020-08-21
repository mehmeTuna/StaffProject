<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePaymenthistoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('paymenthistory', function (Blueprint $table) {
            $table->increments('id');
            $table->char('type', 191)->comment('odeme tipi');
            $table->bigInteger('staff')->comment('staff id');
            $table->boolean('active')->default(1)->comment('varsayilan aktif olup olamdigi kontrol edilen kolon');
            $table->double('pay', 4, 2)->comment('ucret');
            $table->char('comment', 191)->nullable()->comment('odeme islemi icin yapilan yorumlar bu kisima eklenecek');
            $table->timestamps();

            $table->index('id');
            $table->index('active');
            $table->index('staff');
            $table->index('type');
            $table->index('pay');
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
        Schema::dropIfExists('paymenthistory');
    }
}
