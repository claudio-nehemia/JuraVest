<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Investor extends Model
{
    protected $fillable = [
        'nama_investor',
        'user_id',
        'tujuan_investasi',
        'foto_profil',
        'target_pasar_invest',
        'jenis_usaha_invest'
    ];

    protected $casts = [
        'jenis_usaha_invest' => 'array',
        'target_pasar_invest' => 'array'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    // Accessor untuk foto profil URL
    public function getFotoProfilUrlAttribute()
    {
        return $this->foto_profil ? asset('storage/' . $this->foto_profil) : null;
    }

    // Mutator untuk memastikan jenis_usaha_invest selalu integer
    public function setJenisUsahaInvestAttribute($value)
    {
        if (is_array($value)) {
            $this->attributes['jenis_usaha_invest'] = json_encode(array_map('intval', $value));
        } else {
            $this->attributes['jenis_usaha_invest'] = $value;
        }
    }

    // Mutator untuk memastikan target_pasar_invest selalu integer
    public function setTargetPasarInvestAttribute($value)
    {
        if (is_array($value)) {
            $this->attributes['target_pasar_invest'] = json_encode(array_map('intval', $value));
        } else {
            $this->attributes['target_pasar_invest'] = $value;
        }
    }

    // Accessor untuk memastikan return integer array
    public function getJenisUsahaInvestAttribute($value)
    {
        if (is_string($value)) {
            $decoded = json_decode($value, true);
            return is_array($decoded) ? array_map('intval', $decoded) : [];
        }
        return is_array($value) ? array_map('intval', $value) : [];
    }

    // Accessor untuk memastikan return integer array
    public function getTargetPasarInvestAttribute($value)
    {
        if (is_string($value)) {
            $decoded = json_decode($value, true);
            return is_array($decoded) ? array_map('intval', $decoded) : [];
        }
        return is_array($value) ? array_map('intval', $value) : [];
    }
}