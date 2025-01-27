<?php

namespace App\Http\Resources;

use App\Models\Pertanyaan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KunciResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $murid = User::find($this->idMurid);
        $pertanyaan = Pertanyaan::query()->get();

        return[
            'idKunciJawaban' => $this->idKunciJawaban,
            'idPertanyaan' => $this->kunciJawaban,
            'jawaban' => $this->jawaban,
        ];
    }
}
