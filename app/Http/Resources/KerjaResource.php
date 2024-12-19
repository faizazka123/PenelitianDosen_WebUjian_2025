<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KerjaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return[
            'idKerja' => $this->idKerja,
            'idMurid' => new MuridResource($this->idMurid), //foreign key
            'idUjian' => new ExamResource($this->idUjian), //foreign key
            'listJawaban' => $this->listJawaban,
            'nilai' => $this->nilai,
            'isActive' => $this->isActive,
            'countKecurangan' => $this->countKecurangan,
        ];
    }
}
