<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreKerjaRequest;
use App\Http\Resources\KerjaResource;
use App\Models\Kerja;
use App\Models\Ujian;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardSiswaController extends Controller
{
    public function index()
    {
        $userId = Auth::id(); // Get the ID of the currently authenticated user
        $query = Kerja::query();
        $kerjas = $query->where('idMurid', $userId)->paginate(10);
        return Inertia('Dashboard', [
            'kerjas' => KerjaResource::collection($kerjas),
        ]);
    }

    public function masukUjian(StoreKerjaRequest $request)
    {
        $ujian = Ujian::where('kodeUjian', $request->kodeUjian)->first();

        $existingKerja = Kerja::where('idMurid', Auth::id())
            ->where('idUjian', $ujian->id)
            ->first();

        if ($existingKerja) {
            return redirect()->back()->with('error', 'Ujian sudah dimasuki.');
        }

        Kerja::create([
            'idMurid' => Auth::id(),
            'idUjian' => $ujian->id,
            'listJawaban' => '[]',
            'isActive' => true,
        ]);

        return redirect()->back()->with('success', 'Berhasil Masuk Ujian.');
    }

    public function indexNilai()
    {
        $userId = Auth::id(); // Get the ID of the currently authenticated user
        $query = Kerja::query();
        $kerjas = $query->where('idMurid', $userId)->paginate(10);
        return Inertia('Nilai', [
            'kerjas' => KerjaResource::collection($kerjas),
        ]);
    }
}
