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
        Schema::table('investors', function (Blueprint $table) {
            $table->dropForeign('target_pasar_invest');
            $table->dropForeign('jenis_usaha_invest');
            $table->dropColumn('target_pasar_invest');
            $table->dropColumn('jenis_usaha_invest');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('investors', function (Blueprint $table) {
            $table->foreignId('target_pasar_invest')->constrained('target_pasars')->onDelete('cascade');
            $table->foreignId('jenis_usaha_invest')->constrained('jenis_usahas')->onDelete('cascade');
        });
    }
};
