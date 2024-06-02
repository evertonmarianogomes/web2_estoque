<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Category;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'first_name' => 'Test',
            'last_name' => 'Admin',
            'email' => 'example@mail.com',
            'login' => 'test.admin',
            'password' => Hash::make('123456')
        ]);

        Category::create([
            'name' => 'Bebidas'
        ]);
    }
}
