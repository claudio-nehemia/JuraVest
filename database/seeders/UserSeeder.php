<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = Role::all()->keyBy('role_name');

        $userData = [
            ['name' => 'Investor', 'email' => 'investor@example.com', 'password' => 'password', 'role_name' => 'Investor'],
            ['name' => 'Wirausaha', 'email' => 'wirausaha@example.com', 'password' => 'password', 'role_name' => 'Wirausaha'],
            ['name' => 'Admin', 'email' => 'admin@example.com', 'password' => 'password', 'role_name' => 'Admin'],
        ];

        foreach ($userData as $item) {
            if (isset($roles[$item['role_name']])) {
                User::create([
                    'name' => $item['name'],
                    'email' => $item['email'],
                    'password' => Hash::make($item['password']),
                    'role_id' => $roles[$item['role_name']]->id,
                ]);
            }
        }
    }
}
