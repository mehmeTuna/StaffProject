<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEmploymentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employment', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('business')->default(0)->nullable()->comment('Hangi işletme...');
            $table->integer('staff')->comment('Hangi çalışan');
            $table->boolean('active')->default(1)->nullable();
            $table->char('comment')->nullable()->comment('İşlem hakkında notlar');
            $table->enum('status', ['Recruitment','Dismiss'])->comment('Durum: İşe alma/işten çıkarma');
            $table->timestamps();

            $table->index('id');
            $table->index('business');
            $table->index('staff');
            $table->index('active');
            $table->index('comment');
            $table->index('status');
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
        Schema::dropIfExists('employment');
    }
}
