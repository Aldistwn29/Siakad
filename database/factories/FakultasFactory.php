<?php

namespace Database\Factories;

use App\Models\Fakultas;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Fakultas>
 */
class FakultasFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $name = $this->faker->unique()->randomElement([
                'Fakultas Teknik Komputer dan Design',
                'Fakultas Humaniora',
                'Fakultas Kedoktoran'
            ]),
            'slug' => Str::slug($name),
            'code' => Str::random(3),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Fakultas $fakultas){
            $departemens = match($fakultas->name){
                'Fakultas Teknik Komputer dan Design' => [
                    ['name' => $name = 'Teknik Informatika','slug' => Str::slug($name),'code' => Str::random(6)],
                    ['name' => $name = 'Teknik Mesin','slug' => Str::slug($name),'code' => Str::random(6)],
                    ['name' => $name = 'Teknik Elektro','slug' => Str::slug($name),'code' => Str::random(6)],
                    ['name' => $name = 'Teknik Sipil','slug' => Str::slug($name),'code' => Str::random(6)],
                ],
                'Fakultas Humaniora' => [
                    ['name' => $name = 'Pendidikan Guru Sekolah Dasar','slug' => Str::slug($name),'code' => Str::random(6)],
                    ['name' => $name = 'Hukum','slug' => Str::slug($name),'code' => Str::random(6)],
                    ['name' => $name = 'Akutansi','slug' => Str::slug($name),'code' => Str::random(6)],
                    ['name' => $name = 'Manajemen','slug' => Str::slug($name),'code' => Str::random(6)],
                ],
                'Fakultas Kedoktoran' => [
                    ['name' => $name = 'Kedoktoran','slug' => Str::slug($name),'code' => Str::random(6)],
                    ['name' => $name = 'Perawat','slug' => Str::slug($name),'code' => Str::random(6)],
                    ['name' => $name = 'Farmasi','slug' => Str::slug($name),'code' => Str::random(6)],
                ],

                default => [],
            };

            // create departemens
            foreach($departemens as $departemen){
                $fakultas->depertemens()->create([
                    'name' => $departemen['name'],
                    'slug' => $departemen['slug'],
                    'code' => $departemen['code'],
                ]);
            }
        });
    }
}
