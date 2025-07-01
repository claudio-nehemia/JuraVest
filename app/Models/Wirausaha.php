<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Wirausaha extends Model
{
    protected $fillable = [
        'user_id',
        'nama_usaha',
        'jenis_usaha_id',
        'target_pasar_id',
        'usaha_baru',
        'usaha_ongoing',
        'tipe_usaha',
        'foto_profil'
    ];

    protected $casts = [
        'usaha_baru' => 'array',
        'usaha_ongoing' => 'array'
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
}
