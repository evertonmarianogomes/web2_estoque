<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $users = User::factory()->count(6)->create();

        foreach ($users as $user) {
            $user->assignRole(2);
        }
    }
}
