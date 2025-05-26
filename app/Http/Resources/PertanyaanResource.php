<?php

namespace App\Http\Resources;

use App\Models\Ujian;
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
        $ujian = Ujian::find($this->idUjian);

        return [
            'idPertanyaan' => $this->id,
            'ujian_id' => new ExamResource(resource: $ujian),
            'pertanyaan' => $this->pertanyaan,
            'jawabans' => JawabanResource::collection($this->jawabans),
            'image' => $this->image,
        ];
    }
}
