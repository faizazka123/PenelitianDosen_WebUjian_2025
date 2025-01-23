<?php

namespace Database\Seeders;

use App\Models\Guru;
use App\Models\Kerja;
use App\Models\User;
use App\Models\Ujian;
use App\Models\MataPelajaran;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Carbon;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();
        Guru::factory(10)->create();


        MataPelajaran::factory()->create([
            'nama' => 'Bahasa Indonesia',
        ]);

        Ujian::factory()->create([
            'NIP' => Guru::inRandomOrder()->first()->NIP,
            'idMapel' => '1',
            'judul' => 'Kata Hubung',
            'tahunAjaran' => '2024/2025',
            'durasi' => Carbon::createFromTime(1, 30, 0)->toTimeString(),
            'kuota' => 15,
        ]);

        Ujian::factory()->create([
            'NIP' => Guru::inRandomOrder()->first()->NIP,
            'idMapel' => '1',
            'judul' => 'Kata Konjungsi',
            'tahunAjaran' => '2024/2025',
            'kodeUjian' => 'Ta7bas',
            'durasi' => Carbon::createFromTime(1, 30, 0)->toTimeString(),
            'kuota' => 15,
        ]);

        Kerja::factory(2)->create();

        // Ujian::factory()->create([
        //     'NIP' => Guru::inRandomOrder()->first()->NIP,
        //     'idMapel' => '1',
        //     'judul' => 'Kata Hubung',
        //     'tahunAjaran' => '2024/2025',
        //     'durasi' => '02:30:00',
        // ]);

        // Ujian::factory(1)->create();
    }
}
