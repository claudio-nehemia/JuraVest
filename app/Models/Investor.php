<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Investor extends Model
{
    protected $fillable = [
        'nama_investor',
        'user_id',
        'tujuan_investasi',
        'foto_profil'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function target_pasars() {
        return $this->belongsToMany(TargetPasar::class,'investor_target_pasars');
    }

    public function jenis_usahas() {
        return $this->belongsToMany(JenisUsaha::class, 'investor_jenis_usahas');
    }
}
