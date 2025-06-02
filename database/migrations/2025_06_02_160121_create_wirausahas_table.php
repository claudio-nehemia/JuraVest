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
            $table->foreignId('jenis_usaha_id')->constrained('jenis_usahas')->onDelete('cascade');
            $table->foreignId('target_pasar_id')->constrained('target_pasars')->onDelete('cascade');
            $table->boolean('waktu_berjalan');
            $table->string('nama_usaha');
            $table->string('lokasi_operasional');
            $table->string('tanggal_rencana_usaha')->nullable();
            $table->string('alokasi_dana')->nullable();
            $table->string('kebutuhan_dana');
            $table->string('proposal')->nullable();
            $table->integer('estimasi_omzet');
            $table->integer('jumlah_karyawan');
            $table->string('media_social');
            $table->text('latar_belakang');
            $table->string('bukti_legalitas_usaha');
            $table->softDeletes();
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
