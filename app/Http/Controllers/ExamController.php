<?php

namespace App\Http\Controllers;

use App\Http\Resources\KerjaResource;
use App\Http\Resources\PertanyaanCollection;
use App\Http\Resources\PertanyaanResource;
use App\Models\Kerja;
use App\Http\Requests\StoreKerjaRequest;
use App\Http\Requests\UpdateKerjaRequest;
use App\Models\Pertanyaan;
use Illuminate\Support\Facades\Request;

class ExamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function prep($id)
    {
        $kerja = Kerja::findOrFail($id);
        $kerjaResource = new KerjaResource($kerja);

        return Inertia('Exam/Prep', [
            'kerja' => $kerjaResource,
            // 'jumlahSoal' => $kerja->idUjian->pertanyaan->count(),
        ]);
    }

    public function startExam($id)
    {
        $kerja = Kerja::findOrFail($id);
        $kerjaResource = new KerjaResource($kerja);

        $pertanyaan = Pertanyaan::where('idUjian', $kerjaResource->idUjian)->get();
        $pertanyaanResource = PertanyaanResource::collection($pertanyaan);
        // dd($pertanyaanResource);
        return Inertia('Exam/Quest', [
            'kerja' => $kerjaResource,
            'pertanyaan' => $pertanyaanResource,
        ]);
    }

    // public function submitExam(Request $request, $id)
    // {
    //     $kerja = Kerja::findOrFail($id);

    //     // Process the student's answers
    //     $answers = $request->input('answers'); // Array of answers from the frontend
    //     $score = 0;

    //     foreach ($kerja->idUjian->soals as $soal) {
    //         if (isset($answers[$soal->id]) && $answers[$soal->id] === $soal->jawaban_benar) {
    //             $score++;
    //         }
    //     }

    //     // Save the score and mark the exam as completed
    //     $kerja->nilai = $score;
    //     $kerja->status = 'completed';
    //     $kerja->save();

    //     return redirect()->route('dashboard')->with('success', 'Ujian telah diselesaikan.');
    // }

    public function submitExam(Request $request, $idKerja)
    {
        $kerja = Kerja::with('idUjian.soal')->findOrFail($idKerja);

        $validated = $request->validate([
            'answers' => 'required|array',
            'answers.*' => 'integer', // Assuming answers are IDs
        ]);

        // Compare answers
        $correctAnswers = $kerja->idUjian->soal->pluck('correct_option');
        $submittedAnswers = collect($validated['answers']);
        $score = $submittedAnswers->intersect($correctAnswers)->count();

        // Save result
        $kerja->update([
            'score' => $score,
            'status' => 'completed',
        ]);

        return redirect()->route('dashboard')->with('success', 'Exam completed successfully!');
    }



}
