<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BuktiPenjualan extends Model
{
    protected $fillable = [
        'wirausaha_id',
        'foto_bukti'
    ];

    public function wirausaha() {
        return $this -> belongsTo(Wirausaha::class);
    }
}
