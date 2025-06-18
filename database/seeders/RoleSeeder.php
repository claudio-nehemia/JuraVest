<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roleData = [
            ['role_name' => 'Investor'],
            ['role_name' => 'Wirausaha'],
            ['role_name' => 'Admin']
        ];

        foreach($roleData as $role) {
            Role::create($role);
        }
    }
}
