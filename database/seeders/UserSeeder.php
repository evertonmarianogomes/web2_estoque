<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'first_name' => 'Everton',
            'last_name' => 'M. Gomes',
            'email' => 'example@mail.com',
            'login' => 'everton.gomes',
            'password' => Hash::make('123456')
        ]);
    }
}
