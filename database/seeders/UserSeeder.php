<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create(
            [
                'name' => 'Asika Mekka',
                'email' => 'AsikaMekka@gmail.com',
                'password' => bcrypt('password123')
            ]
        )->assignRole(
            Role::create([
                'name' => 'Admin'
            ])
        );

        // seeder operator
        $operator = User::factory()->create([
            'name' => 'Adrik',
            'email' => 'Adrik@gmail.com',
            'password' => bcrypt('password123')
        ])->assignRole(Role::create([
            'name' => 'Operator'
        ]));

        $operator->operator()->create([
            'fakultas_id' => 1,
            'departement_id' => 1,
            'employee_number' => str()->padLeft(mt_rand(0, 999999), 6, 0),
        ]);

        // seeder teacher
        $techer = User::factory()->create([
            'name' => 'Budi S.T, M.Kom',
            'email' => 'budi@gmail.com',
            'password' => bcrypt('password123')
        ])->assignRole(Role::create([
            'name' => 'Teacher'
        ]));

        $techer->teacher()->create([
            'fakultas_id' => 1,
            'departement_id' => 1,
            'teachers_number' => str()->padLeft(mt_rand(0, 999999), 6, 0),
            'academic_title' => 'S.T, M.Kom'
        ]);

        // seeder student
        $student = User::factory()->create([
            'name' => 'Andi',
            'email' => 'andi@gmail.com',
            'password' => bcrypt('password123')
        ])->assignRole(Role::create([
            'name' => 'Student'
        ]));

        $student->student()->create([
            'fakultas_id' => 1,
            'departement_id' => 1,
            'fee_group_id' => 1,
            'semester' => 1,
            'batch' => 2023,
            'students_number' => str()->padLeft(mt_rand(0, 999999), 6, 0),
        ]);
    }
}
