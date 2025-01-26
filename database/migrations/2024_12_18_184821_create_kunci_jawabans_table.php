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
        Schema::create('kunci_jawabans', function (Blueprint $table) {
            $table->id('idKunciJawaban');
            $table->unsignedBigInteger('idPertanyaan');
            $table->foreign('idPertanyaan')->references('id')->on('pertanyaans')->onDelete('cascade');
            $table->unsignedBigInteger('idMurid')->nullable();
            $table->foreign('idMurid')->references('id')->on('users')->onDelete('cascade');
            $table->string('jawaban');
            $table->boolean('is_correct')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kunci_jawabans');
    }
};
