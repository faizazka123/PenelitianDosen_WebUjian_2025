<?php

namespace App\Http\Resources;

use App\Models\Ujian;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KerjaResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $murid = User::find($this->idMurid);
        $ujian = Ujian::find($this->idUjian);

        return [
            'idKerja' => $this->idKerja,
            'idMurid' => new MuridResource($murid),
            'idUjian' => new ExamResource(resource: $ujian),
            'listJawaban' => $this->listJawaban,
            'nilai' => $this->nilai,
            'jawaban_benar' => $this->jawaban_benar,
            'jawaban_salah' => $this->jawaban_salah,
            'isActive' => $this->isActive,
            'countKecurangan' => $this->countKecurangan,
        ];
    }
}
