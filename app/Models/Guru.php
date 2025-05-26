<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guru extends Model
{
    /** @use HasFactory<\Database\Factories\GuruFactory> */
    use HasFactory;
    protected $primaryKey = 'NIP';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'NIP',
        'nama',
        'password',
    ];

    public function getRouteKeyName(): string
    {
        return 'NIP';
    }
}
