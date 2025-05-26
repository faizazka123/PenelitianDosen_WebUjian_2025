<?php

namespace Database\Seeders;

use App\Models\Guru;
use App\Models\Jawaban;
use App\Models\Kerja;
use App\Models\Notifikasi;
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

        Guru::factory()->create([
            'NIP' => 54321,
            'nama' => fake()->name(),
            'password' => Hash::make('password'),
            'is_admin' => true,
        ]);

        Guru::factory(10)->create();

        MataPelajaran::factory()->create([
            'nama' => 'Bahasa Indonesia',
        ]);

        $today = now()->format('Y-m-d');

        $jamAwal = Carbon::createFromFormat('Y-m-d H:i:s', "$today 08:00:00");
        $jamAkhir = Carbon::createFromFormat('Y-m-d H:i:s', "$today 09:00:00");

        $durasiDetik = $jamAwal->diffInSeconds($jamAkhir); // hasil: 60
        $durasi = gmdate('H:i:s', $durasiDetik); // hasil: 00:01:00

        Ujian::factory()->create([
            'NIP' => Guru::inRandomOrder()->first()->NIP,
            'idMapel' => '1',
            'judul' => 'Kuis Hubung',
            'tahunAjaran' => '2024/2025',
            'deskripsi' => 'Test aninu',
            'kelas' => 'VII IPA 3',
            'jamAwal' => $jamAwal->toTimeString(),
            'jamAkhir' => $jamAkhir->toTimeString(),
            'durasi' => $durasi,
        ]);

        Ujian::factory()->create([
            'NIP' => Guru::inRandomOrder()->first()->NIP,
            'idMapel' => '1',
            'judul' => 'Kuis Konjungsi',
            'tahunAjaran' => '2024/2025',
            'kelas' => 'VII IPA 3',
            'deskripsi' => 'Test aninu',
            'kodeUjian' => 'Ta7bas',
            'jamAwal' => $jamAwal->toTimeString(),
            'jamAkhir' => $jamAkhir->toTimeString(),
            'durasi' => $durasi,
        ]);

        Ujian::factory()->create([
            'NIP' => Guru::inRandomOrder()->first()->NIP,
            'idMapel' => '1',
            'judul' => 'Kuis Cerpen',
            'tahunAjaran' => '2024/2025',
            'deskripsi' => 'Test aninu',
            'kelas' => 'VII IPA 3',
            'jamAwal' => $jamAwal->toTimeString(),
            'jamAkhir' => $jamAkhir->toTimeString(),
            'durasi' => $durasi,
        ]);

        // Soal 1
        $pertanyaan1 = Pertanyaan::create([
            'ujian_id' => 1,
            'pertanyaan' => 'Apa ibu kota Indonesia?',
            'image' => null,
        ]);

        Jawaban::insert([
            ['pertanyaan_id' => $pertanyaan1->id, 'text' => 'Medan', 'image' => null, 'jawaban_benar' => false],
            ['pertanyaan_id' => $pertanyaan1->id, 'text' => 'Surabaya', 'image' => null, 'jawaban_benar' => false],
            ['pertanyaan_id' => $pertanyaan1->id, 'text' => 'Jakarta', 'image' => null, 'jawaban_benar' => true],
            ['pertanyaan_id' => $pertanyaan1->id, 'text' => 'Bandung', 'image' => null, 'jawaban_benar' => false],
        ]);

        // Soal 2
        $pertanyaan2 = Pertanyaan::create([
            'ujian_id' => 1,
            'pertanyaan' => 'Siapa presiden pertama Indonesia?',
            'image' => null,
        ]);

        Jawaban::insert([
            ['pertanyaan_id' => $pertanyaan2->id, 'text' => 'Soeharto', 'image' => null, 'jawaban_benar' => false],
            ['pertanyaan_id' => $pertanyaan2->id, 'text' => 'Joko Widodo', 'image' => null, 'jawaban_benar' => false],
            ['pertanyaan_id' => $pertanyaan2->id, 'text' => 'Soekarno', 'image' => null, 'jawaban_benar' => true],
            ['pertanyaan_id' => $pertanyaan2->id, 'text' => 'Bacharuddin Jusuf Habibie', 'image' => null, 'jawaban_benar' => false],
        ]);

        // Soal 3
        $pertanyaan3 = Pertanyaan::create([
            'ujian_id' => 1,
            'pertanyaan' => 'Apa lambang negara Indonesia?',
            'image' => null,
        ]);

        Jawaban::insert([
            ['pertanyaan_id' => $pertanyaan3->id, 'text' => 'Pohon Beringin', 'image' => null, 'jawaban_benar' => false],
            ['pertanyaan_id' => $pertanyaan3->id, 'text' => 'Garuda Pancasila', 'image' => null, 'jawaban_benar' => true],
            ['pertanyaan_id' => $pertanyaan3->id, 'text' => 'Banteng', 'image' => null, 'jawaban_benar' => false],
            ['pertanyaan_id' => $pertanyaan3->id, 'text' => 'Burung Cendrawasih', 'image' => null, 'jawaban_benar' => false],
        ]);

        // Soal 4
        $pertanyaan4 = Pertanyaan::create([
            'ujian_id' => 1,
            'pertanyaan' => 'Berapa jumlah provinsi di Indonesia?',
            'image' => null,
        ]);

        Jawaban::insert([
            ['pertanyaan_id' => $pertanyaan4->id, 'text' => '36', 'image' => null, 'jawaban_benar' => false],
            ['pertanyaan_id' => $pertanyaan4->id, 'text' => '30', 'image' => null, 'jawaban_benar' => false],
            ['pertanyaan_id' => $pertanyaan4->id, 'text' => '38', 'image' => null, 'jawaban_benar' => true],
            ['pertanyaan_id' => $pertanyaan4->id, 'text' => '32', 'image' => null, 'jawaban_benar' => false],
        ]);

        // Pertanyaan::factory()->create([
        //     'idUjian' => 1,
        //     'pertanyaan' => 'Apa ibu kota Indonesia?',
        //     'pilihan1' => 'Medan',
        //     'pilihan2' => 'Surabaya',
        //     'pilihan3' => 'Jakarta',
        //     'pilihan4' => 'Bandung',
        //     'pilihan5' => null,
        //     'jawaban' => 3, // Jakarta adalah ibu kota Indonesia
        //     'image' => null,
        // ]);

        // Pertanyaan::factory()->create([
        //     'idUjian' => 1,
        //     'pertanyaan' => 'Siapa presiden pertama Indonesia?',
        //     'pilihan1' => 'Soeharto',
        //     'pilihan2' => 'Joko Widodo',
        //     'pilihan3' => 'Soekarno',
        //     'pilihan4' => 'Bacharuddin Jusuf Habibie',
        //     'pilihan5' => null,
        //     'jawaban' => 3, // Soekarno adalah presiden pertama Indonesia
        //     'image' => null,
        // ]);

        // Pertanyaan::factory()->create([
        //     'idUjian' => 1,
        //     'pertanyaan' => 'Apa lambang negara Indonesia?',
        //     'pilihan1' => 'Pohon Beringin',
        //     'pilihan2' => 'Garuda Pancasila',
        //     'pilihan3' => 'Banteng',
        //     'pilihan4' => 'Burung Cendrawasih',
        //     'pilihan5' => null,
        //     'jawaban' => 2, // Garuda Pancasila adalah lambang negara Indonesia
        //     'image' => null,
        // ]);

        // Pertanyaan::factory()->create([
        //     'idUjian' => 1,
        //     'pertanyaan' => 'Berapa jumlah provinsi di Indonesia?',
        //     'pilihan1' => '36',
        //     'pilihan2' => '30',
        //     'pilihan3' => '38',
        //     'pilihan4' => '32',
        //     'pilihan5' => null,
        //     'jawaban' => 3, // Jumlah provinsi di Indonesia adalah 34
        //     'image' => null,
        // ]);

        Kerja::factory()->create([
            'idMurid' => User::query()->first()->id,
            'idUjian' => 3,
            'listJawaban' => 'testing',
            'isActive' => false,
            'nilai' => 60,
        ]);

        Kerja::factory()->create([
            'idMurid' => User::query()->first()->id,
            'idUjian' => 2,
            'listJawaban' => 'testing',
            'isActive' => true,
        ]);

        Kerja::factory()->create([
            'idMurid' => User::query()->first()->id,
            'idUjian' => 1,
            'listJawaban' => 'testing',
            'isActive' => true,
            'nilai' => 0,
        ]);

        // Kerja::factory(2)->create();

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
