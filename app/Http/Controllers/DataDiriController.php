<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\DataDiri;
use App\Models\Pekerjaan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DataDiriController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    private $pendidikan_terakhir = ['SD', 'SMP', 'SMA', 'D3', 'S1', 'S2', 'S3'];
    private $jenis_kelamin = ['Laki-Laki', 'Perempuan'];
    
    public function index()
    {
        $dataDiris = DataDiri::with('user.role', 'pekerjaan')->get();
        return Inertia::render('admin/dataDiri/index',[
            'dataDiris' => $dataDiris
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $pekerjaan = Pekerjaan::select('id', 'job')->get();
        return Inertia::render('admin/dataDiri/form',[
            'mode' => 'create',
            'pekerjaan' => $pekerjaan,
            'jenis_kelamin' => $this->jenis_kelamin,
            'pendidikan_terakhir' => $this->pendidikan_terakhir
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'alamat' => 'required|string',
            'pendidikan_terakhir' => 'required|in:' . implode(',', $this->pendidikan_terakhir),
            'jenis_kelamin' => 'required|in:' . implode(',' , $this->jenis_kelamin),
            'pekerjaan_id' => 'required|exists:pekerjaans,id'
        ]);

        if (DataDiri::where('user_id', Auth::id())->exists()) {
            return redirect()->back()->withErrors(['msg'=>'Kamu Sudah Memiliki Data Diri']);
        }

        DataDiri::create(array_merge($validated, [
            'user_id' => Auth::id()
        ]));

        return redirect()->route('dataDiri.index')->with('success', 'Data Diri Berhasil Dibuat');
    }

    /**
     * Display the specified resource.
     */
    public function show(DataDiri $dataDiri)
    {
        return Inertia::render('admin/dataDiri/show', [
            'dataDiri' => $dataDiri->load('user.role', 'pekerjaan')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DataDiri $dataDiri)
    {
        $pekerjaan = Pekerjaan::select('id', 'job')->get();
        return Inertia::render('admin/dataDiri/form',[
            'mode' => 'edit',
            'dataDiri' => $dataDiri, // Tambahkan data existing
            'pendidikan_terakhir' => $this->pendidikan_terakhir,
            'jenis_kelamin' => $this->jenis_kelamin,
            'pekerjaan' => $pekerjaan
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DataDiri $dataDiri)
    {
        $validated = $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'alamat' => 'required|string',
            'pendidikan_terakhir' => 'required|in:' . implode(',', $this->pendidikan_terakhir),
            'jenis_kelamin' => 'required|in:' . implode(',' , $this->jenis_kelamin),
            'pekerjaan_id' => 'required|exists:pekerjaans,id'
        ]);

        // Jangan ubah user_id, biarkan sesuai data original
        $dataDiri->update($validated);

        return redirect()->route('dataDiri.index')->with('success', 'Data Diri Berhasil Diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DataDiri $dataDiri)
    {
        $dataDiri->delete();

        return redirect()->route('dataDiri.index')->with('success', 'Data Diri Berhasil Dihapus');
    }
}