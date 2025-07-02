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
        Schema::create('investor_target_pasars', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('investor_id')->constrained('investors')->onDelete('cascade');
            $table->foreignId('target_pasar_id')->constrained('target_pasars')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('investor_target_pasars');
    }
};
