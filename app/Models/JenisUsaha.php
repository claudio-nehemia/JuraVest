<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JenisUsaha extends Model
{
    protected $fillable = [
        'jenis_usaha',
        'icon'
    ];

    public function wirausahas() {
        return $this->hasMany(Wirausaha::class);
    }
}
