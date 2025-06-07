<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Pekerjaan;
use Illuminate\Http\Request;

class PekerjaanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/pekerjaan/index',[
            'pekerjaans' => Pekerjaan::withCount('wirausahas')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/pekerjaan/form',[
            'mode' => 'create'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'job' => 'required|string|max:30'
        ]);

        Pekerjaan::store($validated);

        return redirect()->route('pekerjaan.index')->with('success', 'Pekerjaan Berhasil Ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function edit(Pekerjaan $pekerjaan)
    {
        return Inertia::render('admin/pekerjaan/form',[
            'mode' => 'edit',
            'pekerjaan' => $pekerjaan
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pekerjaan $pekerjaan)
    {
        $validated = $request->validate([
            'job' => 'required|string|max:30'
        ]);

        $pekerjaan->update($validated);
        return redirect()->route('pekerjaan.index')->with('success', 'Pekerjaan Berhasil diupdate');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pekerjaan $pekerjaan)
    {
        $pekerjaan->delete();

        return redirect()->route('pekerjaan.index')->with('success', 'Pekerjaan telah dihapus');
    }
}
