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
        Schema::create('investors', function (Blueprint $table) {
            $table->id();
            $table->string('nama_investor');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade')->unique();
            $table->jsonb('target_pasar_invest')->nullable();
            $table->jsonb('jenis_usaha_invest')->nullable();
            $table->string('tujuan_investasi');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('investors');
    }
};
