<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class jawaban_siswa extends Model
{
    /** @use HasFactory<\Database\Factories\JawabanSiswaFactory> */
    use HasFactory;

    protected $fillable = [
        'kerja_id',
        'pertanyaan_id',
        'jawaban_id',
        'is_correct',
    ];

 public function kerja()
    {
        return $this->belongsTo(Kerja::class, 'kerja_id');
    }

    public function pertanyaan()
    {
        return $this->belongsTo(Pertanyaan::class, 'pertanyaan_id');
    }

    public function jawaban()
    {
        return $this->belongsTo(Jawaban::class, 'jawaban_id');
    }


}
