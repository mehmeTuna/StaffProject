<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Experience extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Experience', function (Blueprint $table) {
            $table->comment = 'Tanımlanmış görevler.';
            $table->increments('id');
            $table->boolean('active')->default(1);
            $table->tinyInteger('workClass')->default(1)->comment('0=Free-Time, 1=Planned-Time, 2=Full-Time	');
            $table->text('workingPlan')->comment('calisma plani');
            $table->float('pay', 6,2)->comment('ucret');
            $table->char('factor', 20)->comment('tipi');
            $table->integer('periode')->comment('periode');
            $table->char('color', 200)->default(0)->comment('Renk belirtmek için');
            $table->bigInteger('business')->default(0)->comment('Hangi işletme');
            $table->char('identifier', 50)->default(null);
            $table->enum('class', ['Unspecified', 'Staff', 'Manager', 'Boss', 'Operator', 'Other']);
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
        Schema::dropIfExists('Experience');
    }
}
