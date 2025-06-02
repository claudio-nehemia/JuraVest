<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Wirausaha extends Model
{
    use SoftDeletes;

    protected $fillable = [
         'user_id',
         'jenis_usaha_id',
         'target_pasar_id',
         'waktu_berjalan',
         'nama_usaha',
         'lokasi_operasional',
         'tanggal_rencana_usaha',
         'alokasi_dana',
         'kebutuhan_dana',
         'proposal',
         'estimasi_omzet',
         'jumlah_karyawan',
         'media_social',
         'latar_belakang',
         'bukti_legalitas_usaha',
    ];

    protected $dates = [
        'deleted_at'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function jenis_usaha() {
        return $this->belongsTo(JenisUsaha::class);
    }

    public function target_pasar() {
        return $this->belongsTo(TargetPasar::class);
    }

    public function bukti_penjualans() {
        return $this->hasMany(BuktiPenjualan::class);
    }
}
