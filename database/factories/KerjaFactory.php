<?php

namespace Database\Factories;

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
            'idMurid' => 1,
            'idUjian' => 1,
            'listJawaban' => 'testing',
            'isActive' => true,
        ];
    }
}
