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
        Schema::create('data_diris', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->unique()->onDelete('cascade');
            $table->string('nama_lengkap');
            $table->date('tanggal_lahir');
            $table->text('alamat');
            $table->enum('pendidikan_terakhir', ['SD', 'SMP', 'SMA', 'D3', 'S1', 'S2', 'S3']);
            $table->enum('jenis_kelamin',['Laki-Laki','Perempuan']);
            $table->foreignId('pekerjaan_id')->constrained('pekerjaans')->nullable()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_diris');
    }
};
