<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('kerjas', function (Blueprint $table) {
            $table->id('idKerja');
            $table->foreignId('idMurid')->constrained('users')->onDelete('cascade');
            $table->foreignId('idUjian')->constrained('ujians')->onDelete('cascade');
            $table->text('listJawaban');
            $table->integer('nilai')->nullable();
            $table->integer('jawaban_benar')->nullable()->default(null);
            $table->integer('jawaban_salah')->nullable()->default(null);
            $table->boolean('isActive');
            $table->boolean('isCheating')->default(false);
            $table->json('random_pertanyaan')->nullable();
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
