<?php

namespace App\Http\Controllers;

use App\Http\Resources\KerjaResource;
use App\Models\Kerja;
use App\Http\Requests\StoreKerjaRequest;
use App\Http\Requests\UpdateKerjaRequest;
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
        $kerja = Kerja::with('idUjian.soals')->findOrFail($id);

        return Inertia('Exam/Quest', [
            'kerja' => $kerja,
            'soals' => $kerja->idUjian->pertanyaan, // Pass all the questions
            'durasi' => $kerja->idUjian->durasi, // Pass the duration
        ]);
    }

    public function submitExam(Request $request, $id)
    {
        $kerja = Kerja::findOrFail($id);

        // Process the student's answers
        $answers = $request->input('answers'); // Array of answers from the frontend
        $score = 0;

        foreach ($kerja->idUjian->soals as $soal) {
            if (isset($answers[$soal->id]) && $answers[$soal->id] === $soal->jawaban_benar) {
                $score++;
            }
        }

        // Save the score and mark the exam as completed
        $kerja->nilai = $score;
        $kerja->status = 'completed';
        $kerja->save();

        return redirect()->route('dashboard')->with('success', 'Ujian telah diselesaikan.');
    }


}
