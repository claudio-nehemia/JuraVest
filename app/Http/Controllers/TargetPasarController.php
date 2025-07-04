<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\TargetPasar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TargetPasarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/target_pasar/index', [
            'targetPasars' => TargetPasar::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/target_pasar/form',[
            'mode' => 'create'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'target_pasar' => 'required|string|max:50',
            'icon' => 'nullable|image'
        ]);

        if($request->hasFile('icon')) {
            $validated['icon'] = $request->file('icon')->store('target_icons','public');
        }

        TargetPasar::create($validated);

        return redirect()->route('target_pasar.index')->with('success','Target Pasar Berhasil Ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    
    public function edit(TargetPasar $targetPasar)
    {
        return Inertia::render('admin/target_pasar/form',[
            'target_pasar' => $targetPasar,
            'mode' => 'edit'
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TargetPasar $targetPasar)
    {
        $validated = $request->validate([
            'target_pasar' => 'required|string|max:50',
            'icon' => 'nullable|image'
        ]);

        if($request->hasFile('icon')) {
            if($targetPasar->icon) {
                Storage::disk('public')->delete($targetPasar->icon);
            }
            $validated['icon'] = $request->file('icon')->store('target_icons','public');
        } else {
            unset($validated['icon']);
        }
        $targetPasar->update($validated);

        return redirect()->route('target_pasar.index')->with('success','Target Pasar Berhasil Diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TargetPasar $targetPasar)
    {
        if($targetPasar->icon) {
            Storage::disk('public')->delete($targetPasar->icon);
        }

        $targetPasar->delete();

        return redirect()->route('target_pasar.index')->with('success','Target Pasar Berhasil Dihapus');
    }
}
