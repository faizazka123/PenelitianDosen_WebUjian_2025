<?php

namespace App\Http\Resources;

use App\Models\Jawaban;
use App\Models\Kerja;
use App\Models\Pertanyaan;
use App\Models\Ujian;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JawabanSiswaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $kerja = Kerja::find($this->kerja_id);
        $pertanyaan = Pertanyaan::find($this->pertanyaan_id);
        $jawaban = Jawaban::find($this->jawaban_id);

        return [
            'id' => $this->id,
            'kerja_id' => new KerjaResource($kerja),
            'pertanyaan_id' => new PertanyaanResource(resource: $pertanyaan),
            'jawaban_id' => new JawabanResource($jawaban),
            'is_correct' => $this->is_correct,
        ];
    }
}
