<?php

namespace App\Imports;

use App\Models\Ujian;
use App\Models\Pertanyaan;
use App\Models\Jawaban;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

// class SoalImport implements ToCollection, WithHeadingRow
// {
//     protected $ujian_id;

//     public function __construct($ujian_id)
//     {
//         $this->ujian_id = $ujian_id;
//     }

//     public function collection(Collection $rows)
//     {
//         foreach ($rows as $row) {
//             // Buat pertanyaan baru
//             $pertanyaan = Pertanyaan::create([
//                 'ujian_id' => $this->ujian_id,
//                 'pertanyaan' => $row['pertanyaan'] ?? '',
//             ]);

//             $jawabanBenar = strtolower(trim($row['jawaban_benar'] ?? ''));

//             for ($i = 1; $i <= 5; $i++) {
//                 $text = strtolower(trim($row['jawaban' . $i] ?? ''));
//                 if (!empty($text)) {
//                     Jawaban::create([
//                         'pertanyaan_id' => $pertanyaan->id,
//                         'text' => ucfirst($text),
//                         'jawaban_benar' => $text === $jawabanBenar,
//                     ]);
//                 }
//             }
//         }
//     }
// }
class SoalImport implements ToCollection, WithHeadingRow
{
    protected $ujian_id;

    public function __construct($ujian_id)
    {
        $this->ujian_id = $ujian_id;
    }

    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            $pertanyaan = Pertanyaan::create([
                'ujian_id' => $this->ujian_id,
                'pertanyaan' => $row['pertanyaan'] ?? '',
            ]);

            $jawabanBenar = strtolower(trim($row['jawaban_benar'] ?? ''));
            $jawabanList = [];
            $adaYangBenar = false;

            for ($i = 1; $i <= 5; $i++) {
                $text = strtolower(trim($row['jawaban' . $i] ?? ''));
                if (!empty($text)) {
                    $isBenar = $text === $jawabanBenar;

                    if ($isBenar) {
                        $adaYangBenar = true;
                    }

                    $jawabanList[] = [
                        'pertanyaan_id' => $pertanyaan->id,
                        'text' => ucfirst($text),
                        'jawaban_benar' => $isBenar,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
            }

            if (!$adaYangBenar && count($jawabanList) > 0) {
                $jawabanList[0]['jawaban_benar'] = true;
            }

            Jawaban::insert($jawabanList);
        }
    }
}
