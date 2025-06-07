<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DataDiri extends Model
{

    protected $fillable = [
        'user_id',
        'nama_lengkap',
        'tanggal_lahir',
        'alamat',
        'pendidikan_terakhir',
        'jenis_kelamin',
        'pekerjaan_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function pekerjaan() 
    {
        return $this->belongsTo(Pekerjaan::class);  
    }
}
