<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pekerjaan extends Model
{
    protected $fillable = [
        'job'
    ];

    public function dataDiris() {
        return $this->hasMany('data_diri');
    }
}
