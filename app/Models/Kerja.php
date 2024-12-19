<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kerja extends Model
{
    /** @use HasFactory<\Database\Factories\KerjaFactory> */
    use HasFactory;

    public function exams()
    {
        return $this->hasMany(Ujian::class);
    }

    public function idMurid()
    {
        return $this->belongsTo(User::class, 'idMurid');
    }
}
