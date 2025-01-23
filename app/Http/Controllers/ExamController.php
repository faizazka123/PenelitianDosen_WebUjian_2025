<?php

namespace App\Http\Controllers;

use App\Http\Resources\KerjaResource;
use App\Models\Kerja;
use App\Http\Requests\StoreKerjaRequest;
use App\Http\Requests\UpdateKerjaRequest;

class ExamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function show(Kerja $kerja)
    {
        return Inertia('Exam/Prep', [
            'kerja' => new KerjaResource($kerja),
        ]);
    }

    public function question()
    {
        return inertia('Exam/Quest');
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
    public function store(StoreKerjaRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */

    public function edit(Kerja $kerja)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateKerjaRequest $request, Kerja $kerja)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kerja $kerja)
    {
        //
    }
}
