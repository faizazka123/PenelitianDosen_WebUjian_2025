<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Pertanyaan extends Model
{
    /** @use HasFactory<\Database\Factories\PertanyaanFactory> */
    use HasFactory;

    protected static function booted()
    {
        static::deleting(function ($pertanyaan) {
            if ($pertanyaan->image) {
                Storage::delete($pertanyaan->image);
            }

            foreach ($pertanyaan->jawabans as $jawaban) {
                if ($jawaban->image) {
                    Storage::delete($jawaban->image);
                }
            }
        });
    }


    protected $fillable = [
        'ujian_id',
        'pertanyaan',

        'jawaban',
        'image',
    ];

    public function ujian()
    {
        return $this->belongsTo(Ujian::class, 'idUjian');
    }

    public function jawabans()
    {
        return $this->hasMany(Jawaban::class);
    }

    public function jawaban_siswa()
{
    return $this->hasMany(jawaban_siswa::class, 'pertanyaan_id');
}
}
