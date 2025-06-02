<?php

namespace App\Http\Controllers;

use App\Models\JenisUsaha;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JenisUsahaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jenis_usahas = JenisUsaha::withCount('wirausahas')->get();
        return Inertia::render('admin/jenis_usaha/index',[
            'jenis_usahas' => $jenis_usahas
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/jenis_usaha/form',[
            'mode' => 'create'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'jenis_usaha' => 'required|string|max:20'
        ]);

        JenisUsaha::create($validated);

        return redirect()->route('jenis_usaha.index')->with('success','Jenis Usaha Berhasil Ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function edit(JenisUsaha $jenisUsaha)
    {
        return Inertia::render('admin/jenis_usaha/form',[
            'mode' => 'edit',
            'jenis_usaha' => $jenisUsaha
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, JenisUsaha $jenisUsaha)
    {
        $validated = $request->validate([
            'jenis_usaha' => 'required|string|max:20'
        ]);

        $jenisUsaha->update($validated);

        return redirect()->route('jenis_usaha.index')->with('success', 'Jenis Usaha Berhasil Diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JenisUsaha $jenisUsaha)
    {
        $jenisUsaha->delete();

        return redirect()->route('jenis_usaha.index')->with('success', 'Jenis Usaha Berhasil Dihapus');
    }
}
