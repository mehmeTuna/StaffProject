<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Signature extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Signature', function (Blueprint $table) {
            $table->comment = 'Giriş/çıkış denetiminde kullanılacak benzersiz kodlar..';
            $table->increments('Id'); 
            $table->bigInteger('Business')->default(0)->commnet('Hangi işletme');
            $table->bigInteger('Vita')->default(60)->commnet('Geçerli olduğu süre');
            $table->char('HRC', 8)->default(null)->commnet('Human Readable Code');
            $table->char('UIC', 80)->default(null)->commnet('Unique Identitifier Code');
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
        Schema::dropIfExists('Signature');
    }
}
