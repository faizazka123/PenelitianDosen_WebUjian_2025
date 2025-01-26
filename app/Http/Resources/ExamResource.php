<?php

namespace App\Http\Resources;

use App\Models\Guru;
use App\Models\MataPelajaran;
use App\Models\Pertanyaan;
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
        $guru = Guru::where('NIP', $this->NIP)->first();
        $mapel = MataPelajaran::find($this->idMapel);
        // $pertanyaan = Pertanyaan::where('idUjian', $this->id)->get();

        return[
            'idujian' => $this->id,
            'NIP' => new GuruResource(resource: $guru),
            'idMapel' => new MapelResource($mapel),
            // 'pertanyaan' => new PertanyaanResource($pertanyaan),
            'judul' => $this->judul,
            'deskripsi' => $this->deskripsi,
            'tahunAjaran' => $this->tahunAjaran,
            'durasi' => (new Carbon($this->durasi))->format('h:i:s'),
            'kodeUjian' => $this->kodeUjian,
        ];
    }
}
