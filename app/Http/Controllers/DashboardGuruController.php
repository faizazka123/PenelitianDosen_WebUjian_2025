<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreUjianRequest;
use App\Http\Resources\ExamResource;
use App\Http\Resources\KerjaResource;
use App\Http\Resources\MapelResource;
use App\Http\Resources\NotifikasiResource;
use App\Http\Resources\PertanyaanResource;
use App\Imports\SoalImport;
use App\Models\Jawaban;
use App\Models\Kerja;
use App\Models\MataPelajaran;
use App\Models\Notifikasi;
use App\Models\Pertanyaan;
use App\Models\Ujian;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Str;

class DashboardGuruController extends Controller
{
    public function index()
    {
        $guru = auth()->guard('guru')->user();
        $ujians = Ujian::where('NIP', $guru->NIP)->orderBy('created_at', 'desc')->paginate(5);
        $ujianAktif = Ujian::where('NIP', $guru->NIP)
            ->whereNotNull('kodeUjian')->count();
        $ujianTaktif = Ujian::where('NIP', $guru->NIP)
            ->whereNull('kodeUjian')->count();

        return Inertia('Guru/DashboardGuru', [
            'ujians' => ExamResource::collection($ujians),
            'ujianAktif' => $ujianAktif,
            'ujianTaktif' => $ujianTaktif,
        ]);
    }

    public function nilai()
    {
        $guru = auth()->guard('guru')->user();
        $ujians = Ujian::where('NIP', $guru->NIP)->orderBy('created_at', 'desc')->paginate(5);
        return Inertia('Guru/Nilai', [
            'ujians' => ExamResource::collection($ujians),
        ]);
    }

    public function detailNilai($id)
    {
        $kerja = Kerja::where('idUjian', $id)->get();

        // dd($kerja);
        return Inertia('Guru/DetailNilai', [
            'kerjas' => KerjaResource::collection($kerja),
        ]);
    }

    public function notifikasi()
    {
        $notif = Notifikasi::orderBy('created_at', 'desc')->paginate(5);

        return Inertia('Guru/Notifikasi', [
            'notifs' => NotifikasiResource::collection($notif),
        ]);
    }

    public function ujian()
    {
        $guru = auth()->guard('guru')->user();
        $ujians = Ujian::where('NIP', $guru->NIP)->orderBy('created_at', 'desc')->paginate(10);
        return Inertia('Guru/DaftarUjian', [
            'ujians' => ExamResource::collection($ujians),
        ]);
    }

    public function createUjian()
    {
        $query = MataPelajaran::query();
        $mapels = $query->get();
        return Inertia('Guru/TambahUjian', [
            'mapels' => MapelResource::collection($mapels),
        ]);
    }

    public function storeUjian(StoreUjianRequest $request)
    {
        $data = $request->validated();

        $jamAwal = Carbon::createFromFormat('H:i', $request->jamAwal);
        $jamAkhir = Carbon::createFromFormat('H:i', $request->jamAkhir);
        $durasi = $jamAkhir->diff($jamAwal)->format('%H:%I:%S');

        $data['durasi'] = $durasi;

        $guru = auth()->guard('guru')->user();

        $data['NIP'] = $guru->NIP;

        Ujian::create($data);

        return to_route('guru.daftar')
            ->with('successGuruImport', 'Ujian Berhasil Ditambahkan');
    }

    public function editUjian($id)
    {
        $ujian = Ujian::findOrFail($id);

        $mapels = MataPelajaran::all();

        return Inertia('Guru/EditUjian', [
            'ujian' => new ExamResource($ujian),
            'mapels' => MapelResource::collection($mapels),
        ]);
    }

    public function updateUjian(StoreUjianRequest $request, $id)
    {
        $data = $request->validated();

        $jamAwal = Carbon::createFromFormat('H:i:s', $request->jamAwal);
        $jamAkhir = Carbon::createFromFormat('H:i:s', $request->jamAkhir);
        $durasi = $jamAkhir->diff($jamAwal)->format('%H:%I:%S');

        $data['durasi'] = $durasi;

        $guru = auth()->guard('guru')->user();

        $data['NIP'] = $guru->NIP;

        $ujian = Ujian::findOrFail($id);
        $ujian->update($data);

        return to_route('guru.daftar')
            ->with('successGuruImport', 'Ujian Berhasil Diperbarui');
    }

    public function hapusUjian($id)
    {
        $ujian = Ujian::findOrFail($id);
        $ujian->delete();

        return back()->with('success', 'Ujian berhasil dihapus.');
    }

    public function detail($id)
    {
        $userId = Auth::id(); // Get the ID of the currently authenticated user
        $query = Ujian::query();
        $ujian = $query->where('id', $id)->firstOrFail();

        return Inertia('Guru/DetailUjian', [
            'ujian' => new ExamResource($ujian),
        ]);
    }

    public function soal($id)
    {
        // $query = Ujian::query();
        // $ujian = $query->where('id', $id)->firstOrFail();

        $ujian = Ujian::with('pertanyaan')->findOrFail($id);

        return Inertia('Guru/ManageSoal', [
            'ujian' => new ExamResource($ujian),
            'pertanyaan' => PertanyaanResource::collection($ujian->pertanyaan),
        ]);
    }

    public function createSoal($id)
    {
        $ujian = Ujian::with('pertanyaan')->findOrFail($id);

        return Inertia('Guru/TambahSoal', [
            'ujian' => new ExamResource($ujian),
            'pertanyaan' => PertanyaanResource::collection($ujian->pertanyaan),
        ]);
    }

    public function storeSoal(Request $request)
    {

        $pertanyaans = $request->input('pertanyaan');
        $ujian_id = $request->input('ujian_id');
        // dd($ujian_id);

        foreach ($pertanyaans as $index => $p) {
            // Simpan pertanyaan
            $pertanyaan = new Pertanyaan();
            $pertanyaan->ujian_id = $ujian_id;
            $pertanyaan->pertanyaan = $p['isi'];

            if ($request->hasFile("pertanyaan.$index.gambar")) {
                $gambarPertanyaan = $request->file("pertanyaan.$index.gambar")->store('gambar/pertanyaan', 'public');
                $pertanyaan->image = $gambarPertanyaan;
            }

            $pertanyaan->save();

            // Simpan jawaban
            foreach ($p['jawaban'] as $jIndex => $j) {
                $jawaban = new Jawaban();
                $jawaban->pertanyaan_id = $pertanyaan->id;
                $jawaban->text = $j['isi'];
                $jawaban->jawaban_benar = $j['benar'] ? true : false;

                if ($request->hasFile("pertanyaan.$index.jawaban.$jIndex.gambar")) {
                    $gambarJawaban = $request->file("pertanyaan.$index.jawaban.$jIndex.gambar")->store('gambar/jawaban', 'public');
                    $jawaban->image = $gambarJawaban;
                }

                $jawaban->save();
            }
        }

        return redirect()->route('guru.soal', $ujian_id)->with('success', 'Soal berhasil disimpan!');
    }

    public function editSoal($id)
    {
        $ujian = Ujian::with('pertanyaan')->findOrFail($id);

        return Inertia('Guru/EditSoal', [
            'ujian' => new ExamResource($ujian),
            'pertanyaan' => PertanyaanResource::collection($ujian->pertanyaan),
        ]);
    }

    public function updateSoal(Request $request, $id)
    {

        $pertanyaans = $request->input('pertanyaan');
        $ujian_id = $request->input('ujian_id');

        // Hapus semua soal lama
        $pertanyaanLama = Pertanyaan::with('jawabans')->where('ujian_id', $ujian_id)->get();


        foreach ($pertanyaanLama as $pertanyaan) {
            if ($pertanyaan->image) {
                Storage::disk('public')->delete($pertanyaan->image);
            }

            foreach ($pertanyaan->jawabans as $jawaban) {
                if ($jawaban->image) {
                    Storage::disk('public')->delete($jawaban->image);
                }
                $jawaban->delete();
            }

            $pertanyaan->delete();
        }


        foreach ($pertanyaans as $pIndex => $p) {
            if (!empty($p['id'])) {
                $pertanyaan = Pertanyaan::find($p['id']);
            } else {
                $pertanyaan = new Pertanyaan();
                $pertanyaan->ujian_id = $ujian_id;
            }

            $pertanyaan->pertanyaan = $p['isi'];

            if ($request->hasFile("pertanyaan.$pIndex.gambar")) {
                if ($pertanyaan->image) {
                    Storage::disk('public')->delete($pertanyaan->image);
                }
                $path = $request->file("pertanyaan.$pIndex.gambar")->store("gambar/pertanyaan", "public");
                $pertanyaan->image = $path;
            }

            $pertanyaan->save();

            if (!empty($p['id'])) {
                Jawaban::where('pertanyaan_id', $pertanyaan->id)->delete();
            }

            foreach ($p['jawaban'] as $jIndex => $j) {
                $jawaban = new Jawaban();
                $jawaban->pertanyaan_id = $pertanyaan->id;
                $jawaban->text = $j['isi'];
                $jawaban->jawaban_benar = $j['benar'] ? 1 : 0;

                if ($request->hasFile("pertanyaan.$pIndex.jawaban.$jIndex.gambar")) {
                    $path = $request->file("pertanyaan.$pIndex.jawaban.$jIndex.gambar")->store("gambar/jawaban", "public");
                    $jawaban->image = $path;
                }

                $jawaban->save();
            }
        }

        return redirect()->route('guru.soal', $ujian_id)->with('success', 'Soal berhasil diperbarui!');
    }

    public function importSoal($id)
    {
        $ujian = Ujian::with('pertanyaan')->findOrFail($id);

        return Inertia('Guru/ImportSoal', [
            'ujian' => new ExamResource($ujian),
            'pertanyaan' => PertanyaanResource::collection($ujian->pertanyaan),
        ]);
    }

    public function storeImportSoal(Request $request, $id)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls'
        ]);

        $ujian = Ujian::find($id);

        if (!$ujian) {
            return redirect()->back()->withErrors(['Ujian tidak ditemukan.']);
        }

        try {
            Excel::import(new SoalImport($ujian->id), $request->file('file'));
            return redirect()->route('guru.soal', ['id' => $ujian->id])->with('success', 'Soal berhasil diimport.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['Gagal mengimpor soal: ' . $e->getMessage()]);
        }
    }

    public function hapusSoal($id)
    {
        $soal = Pertanyaan::findOrFail($id);
        $soal->delete();

        return back()->with('success', 'Soal berhasil dihapus.');
    }

    public function showKode($id)
    {
        $query = Ujian::query();
        $ujian = $query->where('id', $id)->firstOrFail();
        return Inertia('Guru/ShowKode', [
            'ujian' => new ExamResource($ujian),
        ]);
    }

    public function generate($id)
    {
        $query = Ujian::query();
        $ujian = $query->where('id', $id)->firstOrFail();
        return Inertia('Guru/GenerateCode', [
            'ujian' => new ExamResource($ujian),
        ]);
    }

    public function storeKode(Request $request, $id)
    {
        $request->validate([
            'kuota' => 'required|integer|min:1',
        ]);

        $ujian = Ujian::findOrFail($id);
        $ujian->kuota = $request->kuota;

        if (!$ujian->kodeUjian) {
            $ujian->kodeUjian = strtoupper(Str::random(6)); // contoh: kode acak 6 huruf
            $ujian->kodeUjian_created_at = Carbon::now();
        }

        $ujian->save();

        return redirect()->route('guru.kode', $ujian->id)->with('success', 'Kode berhasil dibuat');
    }
}
