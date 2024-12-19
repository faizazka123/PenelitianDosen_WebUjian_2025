<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PertanyaanResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return[
            'idPertanyaan' => $this->idPertanyaan,
            'idUjian' => new ExamResource($this->idUjian),
            'idKunciJawaban' => new KunciResource($this->idKunciJawaban),
            'pertanyaan' => $this->pertanyaan,
            'pilihan1' => $this->pilihan1,
            'pilihan2' => $this->pilihan2,
            'pilihan3' => $this->pilihan3,
            'pilihan4' => $this->pilihan4,
            'pilihan5' => $this->pilihan5,
            'image' => $this->image,
        ];
    }
}
