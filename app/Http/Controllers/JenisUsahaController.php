<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\JenisUsaha;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class JenisUsahaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jenisUsahas = JenisUsaha::all();
        return Inertia::render('admin/jenis_usaha/index',[
            'jenisUsahas' => $jenisUsahas
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
            'jenis_usaha' => 'required|string|max:20',
            'icon' => 'nullable|image'
        ]);

        if ($request->hasFile('icon')) {
            $validated['icon'] = $request->file('icon')->store('icons', 'public');
        }

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
            'jenis_usaha' => 'required|string|max:20',
            'icon' => 'nullable|image'
        ]);

        if($request->hasFile('icon')) {
            if($jenisUsaha->icon) {
                Storage::disk('public')->delete($jenisUsaha->icon);
            }
            $validated['icon'] = $request->file('icon')->store('icons', 'public');
         } else {
            unset($validated['icon']);
         }
        $jenisUsaha->update($validated);

        return redirect()->route('jenis_usaha.index')->with('success', 'Jenis Usaha Berhasil Diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JenisUsaha $jenisUsaha)
    {
        if($jenisUsaha->icon) {
            Storage::disk('public')->delete($jenisUsaha->icon);
        }

        $jenisUsaha->delete();

        return redirect()->route('jenis_usaha.index')->with('success', 'Jenis Usaha Berhasil Dihapus');
    }
}
