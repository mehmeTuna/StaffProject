<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExperienceTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('experience', function (Blueprint $table) {
            $table->increments('id')->comment('business unique id');
            $table->boolean('active')->nullable()->default(1)->comment('experience in aktif olup olmadigi');
            $table->tinyInteger('workClass')->default(1)->nullable()->comment('0=Free-Time, 1=Planned-Time, 2=Full-Time	');
            $table->text('workingPlan')->nullable()->comment('calisma plani');
            $table->tinyInteger('periode')->default(1)->nullable();
            $table->enum('factor', ['Hour', 'Day', 'Week', 'Month'])->default('Day')->nullable();
            $table->double('pay', 4,2)->comment('Ne kadar ?');
            $table->char('color', 191)->nullable();
            $table->integer('business')->comment('business id');
            $table->char('identifier', 191);
            $table->enum('class', ['Unspecified','Staff','Manager','Boss','Operator','Other']);
            $table->timestamps();

            $table->unique('active');
            $table->index('id');
            $table->index('workClass');
            $table->index('periode');
            $table->index('factor');
            $table->index('pay');
            $table->index('business');
            $table->index('class');
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
        Schema::dropIfExists('experience');
    }
}
