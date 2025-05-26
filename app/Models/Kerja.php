<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kerja extends Model
{
    /** @use HasFactory<\Database\Factories\KerjaFactory> */
    use HasFactory;
    protected $primaryKey = 'idKerja';

    protected $fillable = [
        'idMurid',
        'idUjian',
        'listJawaban',
        'isActive',
        'countKecurangan',
        'nilai',
        'jawaban_benar',
        'jawaban_salah',
    ];

    public function murid()
    {
        return $this->belongsTo(User::class, 'idMurid');
    }

    public function ujian()
    {
        return $this->belongsTo(Ujian::class, 'idUjian');
    }

    public function jawaban_siswa()
    {
        return $this->hasMany(jawaban_siswa::class, 'kerja_id');
    }

}
