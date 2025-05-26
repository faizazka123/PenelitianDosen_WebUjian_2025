<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAnswerRequest;
use App\Http\Resources\KerjaResource;
use App\Http\Resources\PertanyaanCollection;
use App\Http\Resources\PertanyaanResource;
use App\Models\Jawaban;
use App\Models\jawaban_siswa;
use App\Models\Kerja;
use App\Http\Requests\StoreKerjaRequest;
use App\Http\Requests\UpdateKerjaRequest;
use App\Models\KunciJawaban;
use App\Models\MataPelajaran;
use App\Models\Notifikasi;
use App\Models\Pertanyaan;
use App\Models\Ujian;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class ExamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function prep($id)
    {
        $kerja = Kerja::findOrFail($id);

        if ($kerja->isActive === 0) {
            abort(403, 'Anda tidak bisa mengakses halaman ujian secara langsung.');
        }

        $pertanyaan = Pertanyaan::where('ujian_id', $kerja->idUjian)->get();

        return Inertia('Exam/Prep', [
            'kerja' => new KerjaResource($kerja),
            'jumlahSoal' => $pertanyaan->count()
        ]);
    }

    public function start(Request $request, $id)
    {
        $kerja = Kerja::findOrFail($id);

        if ($kerja->idMurid !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        if (!$kerja->random_pertanyaan) {
            $pertanyaanIds = Pertanyaan::where('ujian_id', $kerja->idUjian)->pluck('id')->shuffle()->toArray();
            $kerja->random_pertanyaan = json_encode($pertanyaanIds);
            $kerja->save();
        }

        session(['ujian_dimulai_' . $kerja->idKerja => true]);

        return redirect()->route('kerjas.soal', ['id' => $kerja->idKerja]);
    }

    public function startExam($id)
    {
        $kerja = Kerja::findOrFail($id);

        if (!session()->has('ujian_dimulai_' . $kerja->idKerja)) {
            abort(403, 'Anda tidak bisa mengakses halaman ujian secara langsung.');
        }

        if ($kerja->idMurid !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        $orderedIds = json_decode($kerja->random_pertanyaan, true);
        $pertanyaan = collect($orderedIds)->map(function ($id) {
            return new PertanyaanResource(Pertanyaan::find($id));
        });

        $jawabanSiswa = jawaban_siswa::where('kerja_id', $kerja->idKerja)->get();


        return Inertia('Exam/Quest', [
            'kerja' => new KerjaResource($kerja),
            'pertanyaan' => PertanyaanResource::collection($pertanyaan),
            'jawabanSiswa' => $jawabanSiswa,
        ]);
    }

    public function simpanJawaban(Request $request, $kerjaId)
    {

        $kerja = Kerja::findOrFail($kerjaId);

        if (!session()->has('ujian_dimulai_' . $kerja->idKerja)) {
            abort(403, 'Anda tidak bisa mengakses halaman ujian secara langsung.');
        }

        if ($kerja->idMurid !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        Log::info('Data request masuk:', $request->all());


        $request->validate([
            'pertanyaan_id' => 'required|exists:pertanyaans,id',
            'jawaban_id' => 'required|exists:jawabans,id',
        ]);

        jawaban_siswa::updateOrCreate(
            [
                'kerja_id' => $kerjaId,
                'pertanyaan_id' => $request->pertanyaan_id
            ],
            [
                'jawaban_id' => $request->jawaban_id
            ]
        );
    }

    public function selesaikanUjian(Kerja $kerja)
    {
        if (!session()->has('ujian_dimulai_' . $kerja->idKerja)) {
            abort(403, 'Anda tidak bisa mengakses halaman ujian secara langsung.');
        }

        $jawabanSiswas = jawaban_siswa::where('kerja_id', $kerja->idKerja)->get();

        $totalSoal = Pertanyaan::where('ujian_id', $kerja->idUjian)->get()->count();
        $jumlahBenar = 0;

        foreach ($jawabanSiswas as $jawabanSiswa) {
            $jawaban = Jawaban::find($jawabanSiswa->jawaban_id);
            $isCorrect = $jawaban?->jawaban_benar ?? false;

            $jawabanSiswa->is_correct = $isCorrect;
            $jawabanSiswa->save();

            if ($isCorrect) {
                $jumlahBenar++;
            }
        }


        $nilai = $totalSoal > 0 ? intval(($jumlahBenar / $totalSoal) * 100) : 0;

        $kerja->jawaban_benar = $jumlahBenar;

        $kerja->jawaban_salah = $totalSoal - $jumlahBenar;

        $kerja->isActive = 0;
        $kerja->nilai = $nilai;

        $kerja->save();

        $murid = User::where('id', $kerja->idMurid)->first('nama');
        $ujian = Ujian::where('id', $kerja->idUjian)->first(['judul', 'idMapel']);
        $mapel = MataPelajaran::where('idMapel', $ujian->idMapel)->first('nama');

        $namaMurid = $murid->nama;
        $judulUjian = $ujian->judul;
        $namaMapel = $mapel->nama;

        $notif['content'] = "$namaMurid menyelesaikan $judulUjian $namaMapel.";
        $notif['status'] = 1;

        Notifikasi::create($notif);

        session()->forget('ujian_dimulai_' . $kerja->idKerja);

        return redirect()->route('dashboard')->with('success', 'Ujian berhasil diselesaikan.');
    }

    public function caught(Kerja $kerja)
    {
        if (!session()->has('ujian_dimulai_' . $kerja->idKerja)) {
            abort(403, 'Anda tidak bisa mengakses halaman ujian secara langsung.');
        }

        $totalSoal = Pertanyaan::where('ujian_id', $kerja->idUjian)->get()->count();

        $murid = User::where('id', $kerja->idMurid)->first('nama');

        $kerja->jawaban_benar = 0;

        $kerja->jawaban_salah = $totalSoal;

        $kerja->isActive = 0;

        $kerja->nilai = 0;

        $kerja->save();

        $namaMurid = $murid->nama;
        $notif['content'] = "$namaMurid melakukan tindakan kecurangan.";
        $notif['status'] = 0;

        Notifikasi::create($notif);

        session()->forget('ujian_dimulai_' . $kerja->idKerja);

        return redirect()->route('dashboard')->with('error', 'Anda dikeluarkan dari halaman ujian karena curang.');
    }
}
