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
        Schema::create('wirausahas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('nama_usaha');
            $table->foreignId('jenis_usaha_id')->constrained('jenis_usahas')->onDelete('cascade');
            $table->foreignId('target_pasar_id')->constrained('target_pasars')->onDelete('cascade');
               $table->enum('tipe_usaha',['Usaha Baru', 'Usaha Ongoing']);
            $table->jsonb('usaha_baru');
            $table->jsonb('usaha_ongoing');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wirausahas');
    }
};
