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
        $investors = Investor::with('jenis_usaha', 'user', 'target_pasar')->paginate(10);

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
            'target_pasar_invest' => 'required|exists:target_pasars,id',
            'jenis_usaha_invest' => 'required|exists:jenis_usahas,id',
            'tujuan_investasi' => 'required|string',
            'foto_profil' => 'nullable|image'
        ]);

        if($request->hasFile('foto_profil')) {
            $validated['foto_profil'] = $request->file('foto_profil')->store('investor_profils', 'public');
        }

        Investor::create($validated);

        return redirect()->route('investor.index')->with('success','Investor Berhasil Ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function edit(Investor $investor)
    {
        $targetPasars = TargetPasar::select('id', 'target_pasar')->get();
        $jenisUsahas = JenisUsaha::select('id', 'jenis_usaha')->get();
        $users = User::select('id', 'name', 'email')->get();

        return Inertia::render('admin/investor/form', [
            'investor' => $investor,
            'users' => $users,
            'targetPasars' => $targetPasars,
            'jenisUsahas' => $jenisUsahas,
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
            'target_pasar_invest' => 'required|exists:target_pasars,id',
            'jenis_usaha_invest' => 'required|exists:jenis_usahas,id',
            'tujuan_investasi' => 'required|string',
            'foto_profil' => 'nullable|image'
        ]);

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
