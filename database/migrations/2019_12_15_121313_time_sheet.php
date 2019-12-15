<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TimeSheet extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('TimeSheet', function (Blueprint $table) {
            $table->comment = 'Çalışanlar için Giriş/Çıkış zaman planı. -- 18-10-2018-01-00 Eğer `Data` NULL değil ise bu geçiçi olarak düzenlenmiş plandır. -- 27-06-2018-10-00 Plan her zaman haftalık olarak güne göre düzenlenir. -- 26-03-2019-13-23 Vardiyalı çalışmanın günlere göre ayarlanabilmesi için _Shift sütunu eklendi.';
            $table->increments('Id'); 
            $table->bigInteger('Shift')->default(0);
            $table->bigInteger('Career')->default(0);
            $table->bigInteger('Business')->default(0);
            $table->timestamp('Date')->default(null);
            $table->enum('DayOfWeek', ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])->default(null)->comment('Haftanın hangi günü');
            $table->enum('Type', ['Regular', 'Temporary'])->default(null)->comment('Daimi (Regular), Geçiçci (Temporary)');
            $table->integer('Year')->default(null)->comment('Hangi yıl');
            $table->bigInteger('Staff')->commnet('Hangi Çalışan');
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
        Schema::dropIfExists('TimeSheet');
    }
}
