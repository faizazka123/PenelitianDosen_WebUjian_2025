<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Ujian extends Model
{
    /** @use HasFactory<\Database\Factories\UjianFactory> */
    use HasFactory;

    protected static function booted()
    {
        static::deleting(function ($ujian) {
            foreach ($ujian->pertanyaan as $pertanyaan) {
                // Hapus gambar pertanyaan jika ada
                if ($pertanyaan->image) {
                    Storage::delete($pertanyaan->image);
                }

                // Hapus gambar jawaban yang terkait jika ada
                foreach ($pertanyaan->jawabans as $jawaban) {
                    if ($jawaban->image) {
                        Storage::delete($jawaban->image);
                    }
                }
            }
        });
    }


    protected $fillable = [
        'NIP',
        'idMapel',
        'judul',
        'deskripsi',
        'kelas',
        'tahunAjaran',
        'jamAwal',
        'jamAkhir',
        'durasi',
        'kodeUjian',
        'kuota',
    ];

    public function mapel()
    {
        return $this->belongsTo(MataPelajaran::class, 'idMapel');
    }

    public function pertanyaan()
    {
        return $this->hasMany(Pertanyaan::class, 'ujian_id');
    }

    public function kerjas()
    {
        return $this->hasMany(Kerja::class, 'idUjian');
    }
}
