<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExamResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return[
            'idujian' => $this->idUjian,
            'NIP' => new GuruResource($this->NIP),
            'idMapel' => new MapelResource($this->idMapel),
            'judul' => $this->judul,
            'tahunAjaran' => $this->tahunAjaran,
            'durasi' => (new Carbon($this->durasi))->format('h:i:s'),
            'kodeUjian' => $this->kodeUjian,
        ];
    }
}
