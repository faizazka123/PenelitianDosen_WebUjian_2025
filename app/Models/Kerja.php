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
    ];

    public function murid()
    {
        return $this->belongsTo(User::class, 'idMurid');
    }

    public function exams()
    {
        return $this->belongsTo(Ujian::class, 'idUjian');
    }

    public function studentAnswers()
    {
        return $this->hasMany(KunciJawaban::class, 'idKerja');
    }
}
