<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TargetPasar extends Model
{
    protected $fillable = [
        'target_pasar'
    ];

    public function wirausahas() {
        return $this->hasMany(Wirausaha::class);
    }
}
