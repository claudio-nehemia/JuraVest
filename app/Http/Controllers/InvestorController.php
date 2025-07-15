<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Investor;
use App\Models\JenisUsaha;
use App\Models\TargetPasar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class InvestorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $investors = Investor::with('user')->paginate(10);

        return Inertia::render('admin/investor/index',[
            'investors' => $investors
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $jenisUsahas = JenisUsaha::select('id', 'jenis_usaha')->get();
        $targetPasars = TargetPasar::select('id', 'target_pasar')->get();
        $users = User::select('id', 'name', 'role_id')->where('role_id', 1)->get(); 

        return Inertia::render('admin/investor/form', [
            'jenisUsahas' => $jenisUsahas,
            'targetPasars' => $targetPasars,
            'users' => $users,
            'mode' => 'create'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_investor' => 'required|string|max:100',
            'user_id' => 'required|exists:users,id',
            'tujuan_investasi' => 'required|string',
            'foto_profil' => 'nullable|image',
            'jenis_usaha_invest' => 'nullable|array',
            'jenis_usaha_invest.*' => 'integer|exists:jenis_usahas,id', 
            'target_pasar_invest' => 'nullable|array',
            'target_pasar_invest.*' => 'integer|exists:target_pasars,id'
        ]);

        // Convert to integers jika diperlukan
        if (isset($validated['jenis_usaha_invest'])) {
            $validated['jenis_usaha_invest'] = array_map('intval', $validated['jenis_usaha_invest']);
        }
        
        if (isset($validated['target_pasar_invest'])) {
            $validated['target_pasar_invest'] = array_map('intval', $validated['target_pasar_invest']);
        }

        if($request->hasFile('foto_profil')) {
            $validated['foto_profil'] = $request->file('foto_profil')->store('investor_profils', 'public');
        }

        Investor::create($validated);

        return redirect()->route('investor.index')->with('success','Investor Berhasil Ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Investor $investor)
    {
        $investor->load('user'); // memuat relasi user

        // Generate foto_profil_url jika ada
        $investor->foto_profil_url = $investor->foto_profil ? asset('storage/' . $investor->foto_profil) : null;

        // Ambil data master untuk menampilkan label jenis usaha dan target pasar
        $jenisUsahas = JenisUsaha::select('id', 'jenis_usaha')->get();
        $targetPasars = TargetPasar::select('id', 'target_pasar')->get();

        // Cari label jenis_usaha_invest
        $jenisUsahaLabels = [];
        if ($investor->jenis_usaha_invest && is_array($investor->jenis_usaha_invest)) {
            $jenisUsahaLabels = $jenisUsahas->whereIn('id', $investor->jenis_usaha_invest)->pluck('jenis_usaha');
        }

        // Cari label target_pasar_invest
        $targetPasarLabels = [];
        if ($investor->target_pasar_invest && is_array($investor->target_pasar_invest)) {
            $targetPasarLabels = $targetPasars->whereIn('id', $investor->target_pasar_invest)->pluck('target_pasar');
        }

        return Inertia::render('admin/investor/show', [
            'investor' => $investor,
            'jenisUsahaLabels' => $jenisUsahaLabels,
            'targetPasarLabels' => $targetPasarLabels,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function edit(Investor $investor)
    {
        $jenisUsahas = JenisUsaha::select('id', 'jenis_usaha')->get();
        $targetPasars = TargetPasar::select('id', 'target_pasar')->get();
        $users = User::select('id', 'name')->get();

        // Pastikan foto_profil_url ter-generate
        $investor->foto_profil_url = $investor->foto_profil ? asset('storage/' . $investor->foto_profil) : null;

        return Inertia::render('admin/investor/form', [
            'investor' => $investor,
            'users' => $users,
            'jenisUsahas' => $jenisUsahas,
            'targetPasars' => $targetPasars,
            'mode' => 'edit'
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Investor $investor)
    {
        $validated = $request->validate([
            'nama_investor' => 'required|string|max:100',
            'user_id' => 'required|exists:users,id',
            'tujuan_investasi' => 'required|string',
            'foto_profil' => 'nullable|image',
            'jenis_usaha_invest' => 'nullable|array',
            'jenis_usaha_invest.*' => 'integer|exists:jenis_usahas,id', 
            'target_pasar_invest' => 'nullable|array',
            'target_pasar_invest.*' => 'integer|exists:target_pasars,id'
        ]);

        // Convert to integers jika diperlukan
        if (isset($validated['jenis_usaha_invest'])) {
            $validated['jenis_usaha_invest'] = array_map('intval', $validated['jenis_usaha_invest']);
        }
        
        if (isset($validated['target_pasar_invest'])) {
            $validated['target_pasar_invest'] = array_map('intval', $validated['target_pasar_invest']);
        }

        if($request->hasFile('foto_profil')) {
            if($investor->foto_profil) {
                Storage::disk('public')->delete($investor->foto_profil);
            }
            $validated['foto_profil'] = $request->file('foto_profil')->store('investor_profils', 'public');
        } else {
            unset($validated['foto_profil']);
        }

        $investor->update($validated);

        return redirect()->route('investor.index')->with('success','Investor Berhasil Diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Investor $investor)
    {
        if($investor->foto_profil) {
            Storage::disk('public')->delete($investor->foto_profil);
        }

        $investor->delete();

        return redirect()->route('investor.index')->with('success','Investor Berhasil dihapus');
    }
}