<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGuruRequest;
use App\Http\Requests\StoreSiswaRequest;
use App\Http\Requests\UpdateGuruRequest;
use App\Http\Requests\UpdateSiswaRequest;
use App\Http\Resources\GuruResource;
use App\Http\Resources\MuridResource;
use App\Models\Guru;
use App\Models\User;
use Hash;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Event\RequestEvent;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jumlahGuru = Guru::count();
        $jumlahSiswa = User::count();

        return Inertia('Admin/DashboardAdmin', [
            "jumlahGuru" => $jumlahGuru,
            "jumlahSiswa" => $jumlahSiswa,
        ]);
    }

    public function viewDataGuru()
    {
        $query = Guru::query();
        $gurus = $query->orderBy('created_at', 'desc')->get();
        return inertia('Admin/Guru/DataGuru', [
            "gurus" => GuruResource::collection($gurus),
        ]);
        // return Inertia('Admin/Guru/DataGuru');
    }

    public function viewDataSiswa()
    {
        $query = User::query();
        $murids = $query->orderBy('created_at', 'desc')->get();
        return Inertia('Admin/Murid/DataSiswa', [
            "murids" => MuridResource::collection($murids),
        ]);
    }


    public function tambahSiswa()
    {
        return Inertia('Admin/Murid/TambahSiswa');
    }

    public function tambahGuru()
    {
        return Inertia('Admin/Guru/TambahGuru');
    }

    public function guruStore(StoreGuruRequest $request)
    {
        $data = $request->validated();
        unset($data['konfirmasiPassword']);

        $data['password'] = Hash::make($data['password']);
        Guru::create($data);

        return to_route('guru.dataGuru')
            ->with('success', 'Guru berhasil dibuat');
    }

    public function importGuru(Request $request)
    {
        $guruList = $request->input('guruList');

        foreach ($guruList as $guru) {
            Guru::create([
                'nama' => $guru['nama'],
                'NIP' => $guru['NIP'],
                'password' => Hash::make($guru['password']),
            ]);
        }

        return to_route('guru.dataGuru')
            ->with('successGuruImport', 'Import guru berhasil');
    }

    public function siswaStore(StoreSiswaRequest $request)
    {
        $data = $request->validated();
        unset($data['konfirmasiPassword']);

        $data['password'] = Hash::make($data['password']);
        User::create($data);

        return to_route('guru.dataSiswa')
            ->with('success', 'Guru berhasil dibuat');
    }

    public function importSiswa(Request $request)
    {
        $siswaList = $request->input('siswaList');

        foreach ($siswaList as $siswa) {
            User::create([
                'nama' => $siswa['nama'],
                'nis' => $siswa['nis'],
                'kelas' => $siswa['kelas'],
                'password' => Hash::make($siswa['password']),
            ]);
        }

        return to_route('guru.dataSiswa')
            ->with('success', 'Import siswa berhasil');
    }

    public function guruHapus($nip)
    {
        Guru::where('NIP', $nip)->delete();

        return to_route('guru.dataGuru')
            ->with('success', 'Guru berhasil dihapus');
    }

    public function siswaHapus($id)
    {
        User::where('id', $id)->delete();

        return to_route('guru.dataSiswa')
            ->with('success', 'Siswa berhasil dihapus');
    }

    public function guruEdit($nip)
    {
        $guru = Guru::where('NIP', $nip)->firstOrFail();

        return inertia('Admin/Guru/EditGuru', [
            'guru' => new GuruResource($guru),
        ]);
    }

    public function siswaEdit($id)
    {
        $siswa = User::where('id', $id)->firstOrFail();

        return inertia('Admin/Murid/EditSiswa', [
            'siswa' => new MuridResource($siswa),
        ]);
    }

    public function guruUpdate(UpdateGuruRequest $request, $NIP)
    {
        $guru = Guru::where('NIP', $NIP)->firstOrFail();
        $data = $request->validated();



        unset($data['konfirmasiPassword']);

        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        // dd($data);

        $guru->update($data);

        // dd($guru);

        return to_route('guru.dataGuru')->with('success', 'Guru berhasil diedit');
    }

    public function siswaUpdate(UpdateSiswaRequest $request, $id)
    {
        $siswa = User::where('id', $id)->firstOrFail();

        $data = $request->validated();


        unset($data['konfirmasiPassword']);

        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        // dd($data);

        $siswa->update($data);

        // dd($guru);

        return to_route('guru.dataSiswa')->with('success', 'Siswa berhasil diedit');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
