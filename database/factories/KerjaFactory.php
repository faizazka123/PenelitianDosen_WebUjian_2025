<?php

namespace Database\Factories;

use App\Models\Ujian;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Pest\Mutate\Mutators\Number\IncrementInteger;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Kerja>
 */
class KerjaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'idMurid' => User::query()->first()->id,
            'idUjian' => Ujian::inRandomOrder()->first()->id,
            'listJawaban' => 'testing',
            'isActive' => true,
        ];
    }
}
