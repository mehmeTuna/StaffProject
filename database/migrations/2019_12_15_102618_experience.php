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
            $table->increments('Id'); 
            $table->tinyInteger('WorkClass')->default(1)->comment('0=Free-Time, 1=Planned-Time, 2=Full-Time	');
            $table->bigInteger('Color')->default(0)->comment('Renk belirtmek için');
            $table->bigInteger('Charge')->default(0);
            $table->bigInteger('OwnerClass')->default(0);
            $table->bigInteger('Business')->default(0)->comment('Hangi işletme');
            $table->char('Identifier', 50)->default(null);
            $table->enum('Class', ['Unspecified', 'Staff', 'Manager', 'Boss', 'Operator', 'Other']);
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
