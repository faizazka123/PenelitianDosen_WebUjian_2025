<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Jawaban extends Model
{
    /** @use HasFactory<\Database\Factories\JawabanFactory> */
    use HasFactory;

    protected static function booted()
    {
        static::deleting(function ($jawaban) {
            if ($jawaban->image) {
                Storage::delete($jawaban->image);
            }
        });
    }

    protected $fillable = [
        'pertanyaan_id',
        'text',
        'image',
        'jawaban_benar',
    ];

    public function pertanyaan()
    {
        return $this->belongsTo(Pertanyaan::class);
    }

    public function jawaban_siswa()
{
    return $this->hasMany(jawaban_siswa::class, 'pertanyaan_id');
}
}
