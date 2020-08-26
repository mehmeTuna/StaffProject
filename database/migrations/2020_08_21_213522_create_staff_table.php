<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStaffTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('staff', function (Blueprint $table) {
            $table->increments('id');
            $table->char('firstName', 191);
            $table->char('lastName', 191);
            $table->boolean('active')->nullable()->default(1);
            $table->boolean('online')->nullable()->default(0);
            $table->char('loginToken', 191)->nullable();
            $table->double('balance', 6, 2)->nullable()->default(0)->comment('Bakiye');
            $table->double('totalPayment', 6, 2)->nullable()->default(0)->comment('Odenen Toplam ucret');
            $table->double('salary', 6, 2)->nullable()->default(0)->comment('Ortalama saatlik ucret');
            $table->char('factor', 20);
            $table->double('pay', 6, 2)->comment('saatlik alacagi ucret');
            $table->char('periode', 20);
            $table->text('workingPlan');
            $table->date('birthday')->nullable();
            $table->char('image', 191);
            $table->char('address', 191);
            $table->char('password', 191);
            $table->char('telephone', 50);
            $table->char('gsm', 50);
            $table->char('email', 50);
            $table->enum('gender', ['Unspecified','Female','Male'])->nullable()->default('Unspecified');
            $table->enum('martialStatus', ['Unspecified','Single','Married'])->nullable()->default('Unspecified');
            $table->char('lang', 20)->nullable()->default('en_EN');
            $table->integer('experience');
            $table->integer('business')->comment('Hangi isletme');
            $table->integer('employment')->nullable()->default(null)->comment('baglnamis calisma durumu');
            $table->integer('career')->nullable()->default(null)->comment('su anki calisma alani/uzmanligi');
            $table->integer('timeSheetMap');
            $table->timestamps();

            $table->index('id');
            $table->index('active');
            $table->index('online');
            $table->index('loginToken');
            $table->index('balance');
            $table->index('totalPayment');
            $table->index('salary');
            $table->index('factor');
            $table->index('pay');
            $table->index('periode');
            $table->index('email');
            $table->index('business');
            $table->index('employment');
            $table->index('career');
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
        Schema::dropIfExists('staff');
    }
}
