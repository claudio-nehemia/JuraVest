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
            // Data asli
            ['name' => 'Investor', 'email' => 'investor@example.com', 'password' => 'password', 'role_name' => 'Investor'],
            ['name' => 'Wirausaha', 'email' => 'wirausaha@example.com', 'password' => 'password', 'role_name' => 'Wirausaha'],
            ['name' => 'Admin', 'email' => 'admin@example.com', 'password' => 'password', 'role_name' => 'Admin'],

            // Data Investor (15 data)
            ['name' => 'Budi Santoso', 'email' => 'budi.santoso@investor.com', 'password' => 'password', 'role_name' => 'Investor'],
            ['name' => 'Siti Nurhaliza', 'email' => 'siti.nurhaliza@investor.com', 'password' => 'password', 'role_name' => 'Investor'],
            ['name' => 'Ahmad Yani', 'email' => 'ahmad.yani@investor.com', 'password' => 'password', 'role_name' => 'Investor'],
            ['name' => 'Dewi Sartika', 'email' => 'dewi.sartika@investor.com', 'password' => 'password', 'role_name' => 'Investor'],
            ['name' => 'Rudi Hartono', 'email' => 'rudi.hartono@investor.com', 'password' => 'password', 'role_name' => 'Investor'],
            ['name' => 'Maya Sari', 'email' => 'maya.sari@investor.com', 'password' => 'password', 'role_name' => 'Investor'],
            ['name' => 'Joko Widodo', 'email' => 'joko.widodo@investor.com', 'password' => 'password', 'role_name' => 'Investor'],
            ['name' => 'Rina Susanti', 'email' => 'rina.susanti@investor.com', 'password' => 'password', 'role_name' => 'Investor'],
            ['name' => 'Agus Salim', 'email' => 'agus.salim@investor.com', 'password' => 'password', 'role_name' => 'Investor'],
            ['name' => 'Lina Marlina', 'email' => 'lina.marlina@investor.com', 'password' => 'password', 'role_name' => 'Investor'],
            ['name' => 'Hadi Pranoto', 'email' => 'hadi.pranoto@investor.com', 'password' => 'password', 'role_name' => 'Investor'],
            ['name' => 'Sari Indah', 'email' => 'sari.indah@investor.com', 'password' => 'password', 'role_name' => 'Investor'],
            ['name' => 'Wawan Setiawan', 'email' => 'wawan.setiawan@investor.com', 'password' => 'password', 'role_name' => 'Investor'],
            ['name' => 'Tuti Handayani', 'email' => 'tuti.handayani@investor.com', 'password' => 'password', 'role_name' => 'Investor'],
            ['name' => 'Dani Ramadhan', 'email' => 'dani.ramadhan@investor.com', 'password' => 'password', 'role_name' => 'Investor'],

            // Data Wirausaha (30 data)
            ['name' => 'Andi Wijaya', 'email' => 'andi.wijaya@entrepreneur.com', 'password' => 'password', 'role_name' => 'Wirausaha'],
            ['name' => 'Sinta Dewi', 'email' => 'sinta.dewi@entrepreneur.com', 'password' => 'password', 'role_name' => 'Wirausaha'],
            ['name' => 'Bambang Sutrisno', 'email' => 'bambang.sutrisno@entrepreneur.com', 'password' => 'password', 'role_name' => 'Wirausaha'],
            ['name' => 'Ratna Sari', 'email' => 'ratna.sari@entrepreneur.com', 'password' => 'password', 'role_name' => 'Wirausaha'],
            ['name' => 'Hendra Gunawan', 'email' => 'hendra.gunawan@entrepreneur.com', 'password' => 'password', 'role_name' => 'Wirausaha'],
            ['name' => 'Novi Rahayu', 'email' => 'novi.rahayu@entrepreneur.com', 'password' => 'password', 'role_name' => 'Wirausaha'],
            ['name' => 'Fauzi Rahman', 'email' => 'fauzi.rahman@entrepreneur.com', 'password' => 'password', 'role_name' => 'Wirausaha'],
            ['name' => 'Dina Mariana', 'email' => 'dina.mariana@entrepreneur.com', 'password' => 'password', 'role_name' => 'Wirausaha'],
            ['name' => 'Irwan Setiadi', 'email' => 'irwan.setiadi@entrepreneur.com', 'password' => 'password', 'role_name' => 'Wirausaha'],
            ['name' => 'Yuni Astuti', 'email' => 'yuni.astuti@entrepreneur.com', 'password' => 'password', 'role_name' => 'Wirausaha'],
            ['name' => 'Rizki Pratama', 'email' => 'rizki.pratama@entrepreneur.com', 'password' => 'password', 'role_name' => 'Wirausaha'],
            ['name' => 'Eka Putri', 'email' => 'eka.putri@entrepreneur.com', 'password' => 'password', 'role_name' => 'Wirausaha'],
            ['name' => 'Dedy Susilo', 'email' => 'dedy.susilo@entrepreneur.com', 'password' => 'password', 'role_name' => 'Wirausaha'],
            ['name' => 'Fitri Anggraini', 'email' => 'fitri.anggraini@entrepreneur.com', 'password' => 'password', 'role_name' => 'Wirausaha'],
            ['name' => 'Yoga Pratama', 'email' => 'yoga.pratama@entrepreneur.com', 'password' => 'password', 'role_name' => 'Wirausaha'],
            ['name' => 'Indira Sari', 'email' => 'indira.sari@entrepreneur.com', 'password' => 'password', 'role_name' => 'Wirausaha'],
            ['name' => 'Bayu Adi', 'email' => 'bayu.adi@entrepreneur.com', 'password' => 'password', 'role_name' => 'Wirausaha'],
            ['name' => 'Citra Larasati', 'email' => 'citra.larasati@entrepreneur.com', 'password' => 'password', 'role_name' => 'Wirausaha'],
            ['name' => 'Eko Prasetyo', 'email' => 'eko.prasetyo@entrepreneur.com', 'password' => 'password', 'role_name' => 'Wirausaha'],
            ['name' => 'Siska Wulandari', 'email' => 'siska.wulandari@entrepreneur.com', 'password' => 'password', 'role_name' => 'Wirausaha'],
            ['name' => 'Ari Setiawan', 'email' => 'ari.setiawan@entrepreneur.com', 'password' => 'password', 'role_name' => 'Wirausaha'],
            ['name' => 'Mira Handayani', 'email' => 'mira.handayani@entrepreneur.com', 'password' => 'password', 'role_name' => 'Wirausaha'],
            ['name' => 'Gilang Ramadhan', 'email' => 'gilang.ramadhan@entrepreneur.com', 'password' => 'password', 'role_name' => 'Wirausaha'],
            ['name' => 'Nurul Hidayah', 'email' => 'nurul.hidayah@entrepreneur.com', 'password' => 'password', 'role_name' => 'Wirausaha'],
            ['name' => 'Reza Fahlevi', 'email' => 'reza.fahlevi@entrepreneur.com', 'password' => 'password', 'role_name' => 'Wirausaha'],
            ['name' => 'Putri Maharani', 'email' => 'putri.maharani@entrepreneur.com', 'password' => 'password', 'role_name' => 'Wirausaha'],
            ['name' => 'Ferdi Setiawan', 'email' => 'ferdi.setiawan@entrepreneur.com', 'password' => 'password', 'role_name' => 'Wirausaha'],
            ['name' => 'Ayu Lestari', 'email' => 'ayu.lestari@entrepreneur.com', 'password' => 'password', 'role_name' => 'Wirausaha'],
            ['name' => 'Nanda Pratama', 'email' => 'nanda.pratama@entrepreneur.com', 'password' => 'password', 'role_name' => 'Wirausaha'],
            ['name' => 'Wulan Sari', 'email' => 'wulan.sari@entrepreneur.com', 'password' => 'password', 'role_name' => 'Wirausaha'],

            // Data Admin (5 data)
            ['name' => 'Super Admin', 'email' => 'superadmin@admin.com', 'password' => 'password', 'role_name' => 'Admin'],
            ['name' => 'Admin System', 'email' => 'admin.system@admin.com', 'password' => 'password', 'role_name' => 'Admin'],
            ['name' => 'Admin Content', 'email' => 'admin.content@admin.com', 'password' => 'password', 'role_name' => 'Admin'],
            ['name' => 'Admin Support', 'email' => 'admin.support@admin.com', 'password' => 'password', 'role_name' => 'Admin'],
            ['name' => 'Admin Manager', 'email' => 'admin.manager@admin.com', 'password' => 'password', 'role_name' => 'Admin'],
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