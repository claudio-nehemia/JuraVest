<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TargetPasar extends Model
{
    protected $table = 'target_pasars';
    protected $fillable = [
        'target_pasar',
        'icon'
    ];

    public function investors() {
        return $this->hasMany(Investor::class);
    }

    public function wirausahas() {
        return $this->hasMany(Wirausaha::class);
    }

    
}
