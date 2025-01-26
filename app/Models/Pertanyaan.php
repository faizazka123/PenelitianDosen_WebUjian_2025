<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pertanyaan extends Model
{
    /** @use HasFactory<\Database\Factories\PertanyaanFactory> */
    use HasFactory;

    protected $primaryKey = 'idPertanyaan';

    protected $fillable = [
        'idUjian',
        'idKunciJawaban',
        'pertanyaan',
        'pilihan1',
        'pilihan2',
        'pilihan3',
        'pilihan4',
        'pilihan5',
        'image',
    ];

    public function correctAnswer()
    {
        return $this->hasOne(KunciJawaban::class, 'idPertanyaan')->whereNull('idMurid');
    }

    public function ujian()
    {
        return $this->belongsTo(Ujian::class, 'idUjian');
    }

    public function studentAnswers()
    {
        return $this->hasMany(KunciJawaban::class, 'idPertanyaan')->whereNotNull('idMurid');
    }
}
