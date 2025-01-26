<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KunciJawaban extends Model
{
    /** @use HasFactory<\Database\Factories\KunciJawabanFactory> */
    use HasFactory;

    protected $primaryKey = 'idKunciJawaban';

    protected $fillable = [
        'idPertanyaan',
        'idMurid',
        'jawaban',
        'is_correct',
    ];

    // public function pertanyaan()
    // {
    //     return $this->belongsTo(Pertanyaan::class, 'idPertanyaan');
    // }

    // Relationship: Each student answer belongs to one student (nullable for correct answers)
    public function murid()
    {
        return $this->belongsTo(User::class, 'idMurid');
    }
}
