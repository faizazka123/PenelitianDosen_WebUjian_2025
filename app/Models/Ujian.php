<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ujian extends Model
{
    /** @use HasFactory<\Database\Factories\UjianFactory> */
    use HasFactory;

    protected $fillable = [
        'NIP',
        'idMapel',
        'judul',
        'deskripsi',
        'tahunAjaran',
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
        return $this->hasMany(Pertanyaan::class, 'idUjian');
    }

    public function kerjas()
    {
        return $this->hasMany(Kerja::class, 'idUjian');
    }
}
