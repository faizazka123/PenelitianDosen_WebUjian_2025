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
        Schema::create('pertanyaans', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idUjian');
            $table->foreign('idUjian')->references('id')->on('ujians')->onDelete('cascade');
            $table->text('pertanyaan');
            $table->text('pilihan1');
            $table->text('pilihan2');
            $table->text('pilihan3')->nullable();
            $table->text('pilihan4')->nullable();
            $table->text('pilihan5')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pertanyaans');
    }
};
