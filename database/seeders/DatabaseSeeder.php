<?php

namespace Database\Seeders;

use App\Models\Guru;
use App\Models\Kerja;
use App\Models\Pertanyaan;
use App\Models\User;
use App\Models\Ujian;
use App\Models\MataPelajaran;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'nama' => fake()->name(),
            'nis' => 12345,
            'kelas' => random_int(1, 3),
            'password' => Hash::make('password'),
        ]);

        User::factory(10)->create();
        Guru::factory(10)->create();



        MataPelajaran::factory()->create([
            'nama' => 'Bahasa Indonesia',
        ]);

        Ujian::factory()->create([
            'NIP' => Guru::inRandomOrder()->first()->NIP,
            'idMapel' => '1',
            'judul' => 'Kuis Hubung',
            'tahunAjaran' => '2024/2025',
            'durasi' => Carbon::createFromTime(1, 30, 0)->toTimeString(),
            'kuota' => 15,
        ]);

        Ujian::factory()->create([
            'NIP' => Guru::inRandomOrder()->first()->NIP,
            'idMapel' => '1',
            'judul' => 'Kuis Konjungsi',
            'tahunAjaran' => '2024/2025',
            'kodeUjian' => 'Ta7bas',
            'durasi' => Carbon::createFromTime(1, 30, 0)->toTimeString(),
            'kuota' => 15,
        ]);

        Ujian::factory()->create([
            'NIP' => Guru::inRandomOrder()->first()->NIP,
            'idMapel' => '1',
            'judul' => 'Kuis Cerpen',
            'tahunAjaran' => '2024/2025',
            'durasi' => Carbon::createFromTime(1, 30, 0)->toTimeString(),
            'kuota' => 15,
        ]);

        Pertanyaan::factory()->create([
            'idUjian' => 1,
            'pertanyaan' => 'Apa ibu kota Indonesia?',
            'pilihan1' => 'Medan',
            'pilihan2' => 'Surabaya',
            'pilihan3' => 'Jakarta',
            'pilihan4' => 'Bandung',
            'pilihan5' => null,
            'jawaban' => 3, // Jakarta adalah ibu kota Indonesia
            'image' => null,
        ]);

        Pertanyaan::factory()->create([
            'idUjian' => 1,
            'pertanyaan' => 'Siapa presiden pertama Indonesia?',
            'pilihan1' => 'Soeharto',
            'pilihan2' => 'Joko Widodo',
            'pilihan3' => 'Soekarno',
            'pilihan4' => 'Bacharuddin Jusuf Habibie',
            'pilihan5' => null,
            'jawaban' => 3, // Soekarno adalah presiden pertama Indonesia
            'image' => null,
        ]);

        Pertanyaan::factory()->create([
            'idUjian' => 1,
            'pertanyaan' => 'Apa lambang negara Indonesia?',
            'pilihan1' => 'Pohon Beringin',
            'pilihan2' => 'Garuda Pancasila',
            'pilihan3' => 'Banteng',
            'pilihan4' => 'Burung Cendrawasih',
            'pilihan5' => null,
            'jawaban' => 2, // Garuda Pancasila adalah lambang negara Indonesia
            'image' => null,
        ]);

        Pertanyaan::factory()->create([
            'idUjian' => 1,
            'pertanyaan' => 'Berapa jumlah provinsi di Indonesia?',
            'pilihan1' => '36',
            'pilihan2' => '30',
            'pilihan3' => '34',
            'pilihan4' => '32',
            'pilihan5' => null,
            'jawaban' => 3, // Jumlah provinsi di Indonesia adalah 34
            'image' => null,
        ]);

        Kerja::factory()->create([
            'idMurid' => User::query()->first()->id,
            'idUjian' => 3,
            'listJawaban' => 'testing',
            'isActive' => false,
            'nilai' => 60,
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
