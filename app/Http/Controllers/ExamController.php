<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAnswerRequest;
use App\Http\Resources\KerjaResource;
use App\Http\Resources\PertanyaanCollection;
use App\Http\Resources\PertanyaanResource;
use App\Models\Kerja;
use App\Http\Requests\StoreKerjaRequest;
use App\Http\Requests\UpdateKerjaRequest;
use App\Models\KunciJawaban;
use App\Models\Pertanyaan;
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
        $kerjaResource = new KerjaResource($kerja);

        $pertanyaan = Pertanyaan::where('idUjian', $kerjaResource->idUjian)->get();

        return Inertia('Exam/Prep', [
            'kerja' => $kerjaResource,
            'jumlahSoal' => $pertanyaan->count()
        ]);
    }

    public function startExam($id)
    {
        $kerja = Kerja::findOrFail($id);
        $kerjaResource = new KerjaResource($kerja);

        $pertanyaan = Pertanyaan::where('idUjian', $kerjaResource->idUjian)->get();
        $pertanyaanResource = PertanyaanResource::collection($pertanyaan);

        $answer = KunciJawaban::where('idMurid', auth()->id())
            ->whereIn('idPertanyaan', $pertanyaan->pluck('id'))
            ->get()
            ->pluck('jawaban', 'idPertanyaan');

        // dd($answer);

        // dd($pertanyaanResource);
        return Inertia('Exam/Quest', [
            'kerja' => $kerjaResource,
            'pertanyaan' => $pertanyaanResource,
            'answer' => $answer,
        ]);
    }

    public function saveAnswer(StoreAnswerRequest $request)
    {
        $validated = $request->validated();

        // Save or update the answer in the database
        $kunciJawaban = KunciJawaban::updateOrCreate(
            [
                'idPertanyaan' => $validated['idPertanyaan'],
                'idMurid' => $validated['idMurid'],
            ],
            [
                'jawaban' => $validated['jawaban'],
                'is_correct' => null,
            ]
        );
        // try {
        //     $validated = $request->validate([
        //         'idPertanyaan' => 'required|integer|exists:pertanyaans,id',
        //         'jawaban' => 'required|string',
        //     ]);

        //     $answer = KunciJawaban::updateOrCreate(
        //         [
        //             'idPertanyaan' => $validated['idPertanyaan'],
        //             'idMurid' => auth()->id(),
        //         ],
        //         [
        //             'jawaban' => $validated['jawaban'],
        //             'is_correct' => null,
        //         ]
        //     );

        //     return response()->json(['success' => true, 'answer' => $answer]);
        // } catch (\Exception $e) {
        //     return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        // }
    }

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
