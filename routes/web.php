<?php

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

// Route::get('/dashboard', function () {
//     $query = Kerja::query();
//     $kerjas = $query;
//     return Inertia('Dashboard', [
//         'kerjas' => KerjaResource::collection($kerjas),
//     ]);
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::get('/nilai', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('nilai');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardSiswaController::class, 'index'])->name('dashboard');
    Route::get('/nilai', [DashboardSiswaController::class, 'indexNilai'])->name('nilai');


    Route::post('/kerjas', [DashboardSiswaController::class, 'masukUjian'])->name('kerjas.store');

    // Route::get('/ujian/{idKerja}', [ExamController::class, 'index'])->name('ujian');
    Route::get('/start', [ExamController::class, 'question'])->name('kerjas.soal');

    Route::resource('ujian', ExamController::class);


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
