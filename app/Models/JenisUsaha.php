<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JenisUsaha extends Model
{
    protected $table = 'jenis_usahas';
    protected $fillable = [
        'jenis_usaha',
        'icon'
    ];

    public function wirausahas() {
        return $this->hasMany(Wirausaha::class);
    }

    public function investors()
    {
        return $this->hasMany(Investor::class);
    }
}
