<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\DashboardGuruController;
use App\Http\Controllers\DashboardSiswaController;
use App\Http\Controllers\ExamController;
use Inertia\Inertia;
use App\Models\Kerja;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\KerjaResource;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;

Route::get('/', function () {
    return Auth::check()
        ? redirect()->route('dashboard')
        : redirect()->route('login');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardSiswaController::class, 'index'])->name('dashboard');
    Route::get('/nilai', [DashboardSiswaController::class, 'indexNilai'])->name('nilai');


    Route::post('/kerjas', [DashboardSiswaController::class, 'masukUjian'])->name('kerjas.store');

    // Route::get('/ujian/{idKerja}', [ExamController::class, 'index'])->name('ujian');

    // Route::resource('ujian', ExamController::class);
    Route::get('guru/dashboard', [DashboardGuruController::class, 'index'])->name('guru.dashboard');
    Route::get('guru/ujian/daftar', [DashboardGuruController::class, 'ujian'])->name('guru.daftar');
    Route::get('guru/nilai', [DashboardGuruController::class, 'nilai'])->name('guru.nilai');
    Route::get('guru/nilai/{id}', [DashboardGuruController::class, 'detailNilai'])->name('guru.detailNilai');
    Route::get('guru/notifikasi', [DashboardGuruController::class, 'notifikasi'])->name('guru.notifikasi');

    Route::get('guru/ujian/{id}/detail', [DashboardGuruController::class, 'detail'])->name('guru.detail');
    Route::get('guru/ujian/tambah', [DashboardGuruController::class, 'createUjian'])->name('guru.ujian');
    Route::get('guru/ujian/{id}/edit', [DashboardGuruController::class, 'editUjian'])->name('guru.editUjian');
    Route::match(['put', 'patch'], 'guru/ujian/{id}/edit', [DashboardGuruController::class, 'updateUjian'])->name('guru.updateUjian');
    Route::post('guru/ujian/tambah', [DashboardGuruController::class, 'storeUjian'])->name('guru.storeUjian');
    Route::delete('guru/ujian/{id}', [DashboardGuruController::class, 'hapusUjian'])->name('guru.hapusUjian');

    Route::get('guru/ujian/{id}/soal', [DashboardGuruController::class, 'soal'])->name('guru.soal');
    Route::get('guru/ujian/{id}/soal/tambah', [DashboardGuruController::class, 'createSoal'])->name('guru.tambahSoal');
    Route::get('guru/ujian/{id}/soal/edit', [DashboardGuruController::class, 'editSoal'])->name('guru.editSoal');
    Route::match(['put', 'patch'], 'guru/ujian/{id}/soal/edit', [DashboardGuruController::class, 'updateSoal'])->name('guru.updateSoal');
    Route::get('guru/ujian/{id}/soal/import', [DashboardGuruController::class, 'importSoal'])->name('guru.importSoal');
    Route::post('guru/ujian/{id}/soal/import', [DashboardGuruController::class, 'storeImportSoal'])->name('guru.storeImportSoal');
    Route::post('/guru/soal', [DashboardGuruController::class, 'storeSoal'])->name('guru.storeSoal');
    Route::delete('guru/soal/{id}', [DashboardGuruController::class, 'hapusSoal'])->name('guru.soalHapus');

    Route::get('guru/ujian/{id}/kode', [DashboardGuruController::class, 'showKode'])->name('guru.kode');
    Route::get('guru/ujian/{id}/generate', [DashboardGuruController::class, 'generate'])->name('guru.generate');
    Route::post('guru/ujian/{id}/generate', [DashboardGuruController::class, 'storeKode'])->name('guru.storeKode');

    Route::get('ujian/{id}', [ExamController::class, 'prep'])->name('kerja.show');
    Route::post('/ujian/{id}/start', [ExamController::class, 'start'])->name('kerja.mulai');
    Route::get('/ujian/{id}/start', [ExamController::class, 'startExam'])->name('kerjas.soal');
    Route::post('/ujian/{kerja}/jawab', [ExamController::class, 'simpanJawaban'])->name('jawaban.simpan');
    Route::post('/ujian/{kerja}/finish', [ExamController::class, 'selesaikanUjian'])->name('ujian.selesai');
    Route::post('/ujian/{kerja}/caught', [ExamController::class, 'caught'])->name('ujian.caught');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('guru/admin', [AdminController::class, 'index'])->name('guru.admin');
    Route::get('guru/admin/data/guru', [AdminController::class, 'viewDataGuru'])->name('guru.dataGuru');
    Route::get('guru/admin/data/murid', [AdminController::class, 'viewDataSiswa'])->name('guru.dataSiswa');

    Route::get('guru/admin/data/murid/tambah', [AdminController::class, 'tambahSiswa'])->name('guru.tambahSiswa');
    Route::get('guru/admin/data/guru/tambah', [AdminController::class, 'tambahGuru'])->name('guru.tambahGuru');

    Route::post('guru/admin/data/guru/tambah', [AdminController::class, 'guruStore'])->name('guru.guruStore');
    Route::post('guru/admin/data/murid/tambah', [AdminController::class, 'siswaStore'])->name('guru.siswaStore');

    Route::post('/import-guru', [AdminController::class, 'importGuru'])->name('guru.importGuru');
    Route::post('/import-siswa', [AdminController::class, 'importSiswa'])->name('guru.importSiswa');

    Route::delete('guru/admin/data/guru/{NIP}', [AdminController::class, 'guruHapus'])->name('guru.guruHapus');
    Route::delete('guru/admin/data/murid/{id}', [AdminController::class, 'siswaHapus'])->name('guru.siswaHapus');

    Route::get('guru/admin/data/guru/edit/{guru}', [AdminController::class, 'guruEdit'])->name('guru.guruEdit');
    Route::get('guru/admin/data/siswa/edit/{id}', [AdminController::class, 'siswaEdit'])->name('guru.siswaEdit');

    Route::match(['put', 'patch'], 'guru/admin/data/guru/{guru}', [AdminController::class, 'guruUpdate'])->name('guru.guruUpdate');
    Route::match(['put', 'patch'], 'guru/admin/data/siswa/{id}', [AdminController::class, 'siswaUpdate'])->name('guru.siswaUpdate');
});

require __DIR__ . '/auth.php';
