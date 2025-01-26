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
        Schema::create('ujians', function (Blueprint $table) {
            $table->id();
            $table->string('NIP');
            $table->foreign('NIP')->references('NIP')->on('gurus')->onDelete('cascade');
            $table->unsignedBigInteger('idMapel');
            $table->foreign('idMapel')->references('idMapel')->on('mata_pelajarans')->onDelete('cascade');
            $table->string('judul');
            $table->text('deskripsi')->nullable();
            $table->string('tahunAjaran');
            $table->time('durasi');
            $table->string('kodeUjian')->nullable();
            $table->integer('kuota');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ujians');
    }
};
