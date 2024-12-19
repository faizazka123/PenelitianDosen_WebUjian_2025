<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('kerjas', function (Blueprint $table) {
            $table->id('idKerja');
            $table->unsignedBigInteger('idMurid');
            $table->foreign('idMurid')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('idUjian');
            $table->foreign('idUjian')->references('idUjian')->on('ujians')->onDelete('cascade');
            $table->text('listJawaban');
            $table->integer('nilai')->nullable();
            $table->boolean('isActive');
            $table->integer('countKecurangan')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kerjas');
    }
};
