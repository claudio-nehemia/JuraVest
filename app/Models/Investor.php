<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Investor extends Model
{
    protected $fillable = [
        'nama_investor',
        'user_id',
        'target_pasar_invest',
        'jenis_usaha_invest',
        'tujuan_investasi',
        'foto_profil'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function target_pasar() {
        return $this->belongsTo(TargetPasar::class,'target_pasar_invest');
    }

    public function jenis_usaha() {
        return $this->belongsTo(JenisUsaha::class, 'jenis_usaha_invest');
    }
}
