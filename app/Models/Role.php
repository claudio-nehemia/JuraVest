<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class Role extends Model
{
    protected $fillable = [
        'role_name'
    ];

    public function users() {
        return $this->hasMany(User::class);
    }
}
