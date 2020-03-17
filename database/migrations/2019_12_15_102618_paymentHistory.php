<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PaymentHistory extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('paymentHistory', function (Blueprint $table) {
            $table->comment = 'Tanımlanmış kiosklar.';
            $table->increments('id');
            $table->char('type', 200)->comment('type');
            $table->bigInteger('staff')->comment('staff');
            $table->boolean('active')->default(1);
            $table->float('pay', 6, 2)->comment('ucret');
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
        Schema::dropIfExists('paymentHistory');
    }

}
