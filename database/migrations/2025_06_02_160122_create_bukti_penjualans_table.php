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
        Schema::create('bukti_penjualans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('wirausaha_id')->constrained('wirausahas')->onDelete('cascade');
            $table->string('foto_bukti');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bukti_penjualans');
    }
};
