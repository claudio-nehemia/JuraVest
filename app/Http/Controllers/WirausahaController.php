<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Wirausaha;
use App\Models\JenisUsaha;
use App\Models\TargetPasar;
use Illuminate\Http\Request;

class WirausahaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) 
    {
        $wirausahas = Wirausaha::with('jenis_usaha', 'user', 'target_pasar')->get();
        return Inertia::render('admin/wirausaha/allIndex', [
            'wirausahas' => $wirausahas
        ]);
    } 

    public function ongoingIndex(Request $request)
    {
        $wirausahas = Wirausaha::where('tipe_usaha', 'Usaha Ongoing')->with('jenis_usaha', 'user', 'target_pasar')->get();
        return Inertia::render('admin/wirausaha/ongoingIndex', [
            'wirausahas' => $wirausahas
        ]);
    }

    public function newIndex(Request $request)
    {
        $wirausahas = Wirausaha::where('tipe_usaha','Usaha Baru')->with('jenis_usaha', 'user', 'target_pasar')->get();
        return Inertia::render('admin/wirausaha/newIndex', [
            'wirausahas' => $wirausahas
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function ongoingCreate()
    {
        $targetPasars = TargetPasar::select('id','target_pasar')->get();
        $jenisUsahas = JenisUsaha::select('id', 'jenis_usaha')->get();
        $users = User::select('id','name','role_id')->where('role_id',2)->get();
        return Inertia::render('admin/wirausaha/ongoingForm',[
            'mode' => 'create',
            'targetPasars' => $targetPasars,
            'jenisUsahas' => $jenisUsahas,
            'users' => $users
        ]);
    }

    public function newCreate()
    {
        $targetPasars = TargetPasar::select('id','target_pasar')->get();
        $jenisUsahas = JenisUsaha::select('id', 'jenis_usaha')->get();
        $users = User::select('id','name','role_id')->where('role_id',2)->get();
        return Inertia::render('admin/wirausaha/newForm',[
            'mode' => 'create',
            'targetPasars' => $targetPasars,
            'jenisUsahas' => $jenisUsahas,
            'users' => $users
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function ongoingStore(Request $request)
    {
        \Log::info('Request data:', $request->all());

        $user = User::find($request->user_id);
        if ($user && $user->role_id === 2) {

            // Validasi input
            $validated = $request->validate([
                    'user_id' => 'required|exists:users,id',
                    'nama_usaha' => 'required|string|max:50',
                    'jenis_usaha_id' => 'required|exists:jenis_usahas,id',
                    'target_pasar_id' => 'required|exists:target_pasars,id',
                    'tipe_usaha' => 'required|string',

                    // Validasi nested array
                    'usaha_ongoing' => 'required|array',
                    'usaha_ongoing.lokasi_operasional' => 'required|string|max:50',
                    'usaha_ongoing.tahun_berdiri' => 'required|string|max:4',
                    'usaha_ongoing.jumlah_karyawan' => 'required|string|min:1',
                    'usaha_ongoing.estimasi_omzet' => 'required|numeric|min:0',
                    'usaha_ongoing.biaya_operasional' => 'required|numeric|min:0',
                    'usaha_ongoing.rencana_penggunaan_dana' => 'required|string|min:10',
                    'usaha_ongoing.proyeksi_usaha' => 'required|string|min:10',
                    'usaha_ongoing.media_social' => 'required|string|min:3',
                ], [
                    'usaha_ongoing.required' => 'Data usaha ongoing tidak boleh kosong',
                    'usaha_ongoing.array' => 'Data usaha ongoing harus berupa array',

                    'usaha_ongoing.lokasi_operasional.required' => 'Lokasi operasional wajib diisi',
                    'usaha_ongoing.tahun_berdiri.required' => 'Tahun berdiri wajib diisi',
                    'usaha_ongoing.jumlah_karyawan.required' => 'Jumlah karyawan wajib diisi',
                    'usaha_ongoing.estimasi_omzet.required' => 'Estimasi omzet wajib diisi',
                    'usaha_ongoing.estimasi_omzet.numeric' => 'Estimasi omzet harus angka',
                    'usaha_ongoing.biaya_operasional.required' => 'Biaya operasional wajib diisi',
                    'usaha_ongoing.biaya_operasional.numeric' => 'Biaya operasional harus angka',
                    'usaha_ongoing.rencana_penggunaan_dana.required' => 'Rencana penggunaan dana wajib diisi',
                    'usaha_ongoing.proyeksi_usaha.required' => 'Proyeksi usaha wajib diisi',
                    'usaha_ongoing.media_social.required' => 'Media sosial wajib diisi',
                ]);

            \Log::info('Model data ready:', $validated);

            try {
                Wirausaha::create($validated);
                return redirect()->route('ongoingWirausaha.index')
                    ->with('success', 'Wirausaha Ongoing berhasil ditambahkan!');
            } catch (\Exception $e) {
                \Log::error('Error creating wirausaha:', ['error' => $e->getMessage()]);
                return redirect()->back()->withErrors([
                    'message' => 'Terjadi kesalahan saat menyimpan data: ' . $e->getMessage()
                ])->withInput();
            }
        } else {
            return redirect()->back()->withErrors([
                'user_id' => 'User yang dipilih bukan wirausaha yang valid'
            ])->withInput();
        }
    }


    public function newStore(Request $request)
    {
        \Log::info('Request data:', $request->all());

        $user = User::find($request->user_id);
        if ($user && $user->role_id === 2) {

            // Validasi input
            $validated = $request->validate([
                'user_id' => 'required|exists:users,id',
                'nama_usaha' => 'required|string|max:50',
                'jenis_usaha_id' => 'required|exists:jenis_usahas,id',
                'target_pasar_id' => 'required|exists:target_pasars,id',
                'tipe_usaha' => 'required|string',

                // Validasi nested array
                'usaha_baru' => 'required|array',
                'usaha_baru.rencana_lokasi_operasional' => 'required|string|max:50',
                'usaha_baru.rencana_mulai_usaha' => 'required|string|max:4',
                'usaha_baru.alokasi_dana' => 'required|string|min:10',
                'usaha_baru.perkiraan_dana' => 'required|numeric|min:0',
                'usaha_baru.latar_belakang' => 'required|string|min:10'
            ], [
                'user_id.required' => 'Pemilik usaha wajib dipilih',
                'nama_usaha.required' => 'Nama usaha wajib diisi',
                'jenis_usaha_id.required' => 'Jenis usaha wajib dipilih',
                'target_pasar_id.required' => 'Target pasar wajib dipilih',
                
                'usaha_baru.required' => 'Data usaha baru tidak boleh kosong',
                'usaha_baru.array' => 'Data usaha baru harus berupa array',

                'usaha_baru.rencana_lokasi_operasional.required' => 'Rencana lokasi operasional wajib diisi',
                'usaha_baru.rencana_mulai_usaha.required' => 'Rencana mulai usaha wajib diisi',
                'usaha_baru.alokasi_dana.required' => 'Alokasi dana wajib diisi',
                'usaha_baru.perkiraan_dana.required' => 'Perkiraan dana wajib diisi',
                'usaha_baru.perkiraan_dana.numeric' => 'Perkiraan dana harus angka',
                'usaha_baru.latar_belakang.required' => 'Latar belakang wajib diisi'
            ]);

            \Log::info('Model data ready:', $validated);

            try {
                Wirausaha::create($validated);
                return redirect()->route('newWirausaha.index')
                    ->with('success', 'Wirausaha Baru berhasil ditambahkan!');
            } catch (\Exception $e) {
                \Log::error('Error creating wirausaha:', ['error' => $e->getMessage()]);
                return redirect()->back()->withErrors([
                    'message' => 'Terjadi kesalahan saat menyimpan data: ' . $e->getMessage()
                ])->withInput();
            }
        } else {
            return redirect()->back()->withErrors([
                'user_id' => 'User yang dipilih bukan wirausaha yang valid'
            ])->withInput();
        }      
    }

    /**
     * Display the specified resource.
     */
    public function show(Wirausaha $wirausaha)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function newEdit(Wirausaha $wirausaha)
    {
        $targetPasars = TargetPasar::select('id', 'target_pasar')->get();
        $jenisUsahas = JenisUsaha::select('id', 'jenis_usaha')->get();
        $users = User::select('id','name','role_id')->where('role_id', 2)->get();
        return Inertia::render('admin/wirausaha/newForm',[
            'mode' => 'edit',
            'targetPasars' => $targetPasars,
            'jenisUsahas' => $jenisUsahas,
            'users' => $users,
            'wirausaha' => $wirausaha
        ]);
    }

    public function ongoingEdit(Wirausaha $wirausaha)
    {
        $targetPasars = TargetPasar::select('id', 'target_pasar')->get();
        $jenisUsahas = JenisUsaha::select('id', 'jenis_usaha')->get();
        $users = User::select('id','name','role_id')->where('role_id', 2)->get();
        return Inertia::render('admin/wirausaha/ongoingForm',[
            'mode' => 'edit',
            'targetPasars' => $targetPasars,
            'jenisUsahas' => $jenisUsahas,
            'users' => $users,
            'wirausaha' => $wirausaha
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function newUpdate(Request $request, Wirausaha $wirausaha)
    {
        \Log::info('Request data:', $request->all());

        $user = User::find($request->user_id);
        if ($user && $user->role_id === 2) {

            // Validasi input
            $validated = $request->validate([
                'user_id' => 'required|exists:users,id',
                'nama_usaha' => 'required|string|max:50',
                'jenis_usaha_id' => 'required|exists:jenis_usahas,id',
                'target_pasar_id' => 'required|exists:target_pasars,id',
                'tipe_usaha' => 'required|string',

                // Validasi nested array
                'usaha_baru' => 'required|array',
                'usaha_baru.rencana_lokasi_operasional' => 'required|string|max:50',
                'usaha_baru.rencana_mulai_usaha' => 'required|string|max:4',
                'usaha_baru.alokasi_dana' => 'required|string|min:10',
                'usaha_baru.perkiraan_dana' => 'required|numeric|min:0',
                'usaha_baru.latar_belakang' => 'required|string|min:10'
            ], [
                'user_id.required' => 'Pemilik usaha wajib dipilih',
                'nama_usaha.required' => 'Nama usaha wajib diisi',
                'jenis_usaha_id.required' => 'Jenis usaha wajib dipilih',
                'target_pasar_id.required' => 'Target pasar wajib dipilih',
                
                'usaha_baru.required' => 'Data usaha baru tidak boleh kosong',
                'usaha_baru.array' => 'Data usaha baru harus berupa array',

                'usaha_baru.rencana_lokasi_operasional.required' => 'Rencana lokasi operasional wajib diisi',
                'usaha_baru.rencana_mulai_usaha.required' => 'Rencana mulai usaha wajib diisi',
                'usaha_baru.alokasi_dana.required' => 'Alokasi dana wajib diisi',
                'usaha_baru.perkiraan_dana.required' => 'Perkiraan dana wajib diisi',
                'usaha_baru.perkiraan_dana.numeric' => 'Perkiraan dana harus angka',
                'usaha_baru.latar_belakang.required' => 'Latar belakang wajib diisi'
            ]);

            \Log::info('Model data ready:', $validated);

            try {
                $wirausaha->update($validated);
                return redirect()->route('newWirausaha.index')
                    ->with('success', 'Data berhasil diperbarui!');
            } catch (\Exception $e) {
                \Log::error('Error creating wirausaha:', ['error' => $e->getMessage()]);
                return redirect()->back()->withErrors([
                    'message' => 'Terjadi kesalahan saat menyimpan data: ' . $e->getMessage()
                ])->withInput();
            }
        } else {
            return redirect()->back()->withErrors([
                'user_id' => 'User yang dipilih bukan wirausaha yang valid'
            ])->withInput();
        } 
    }

    public function ongoingUpdate(Request $request, Wirausaha $wirausaha)
    {
        \Log::info('Request data:', $request->all());

        $user = User::find($request->user_id);
        if ($user && $user->role_id === 2) {

            // Validasi input   
            $validated = $request->validate([
                    'user_id' => 'required|exists:users,id',
                    'nama_usaha' => 'required|string|max:50',
                    'jenis_usaha_id' => 'required|exists:jenis_usahas,id',
                    'target_pasar_id' => 'required|exists:target_pasars,id',
                    'tipe_usaha' => 'required|string',

                    // Validasi nested array
                    'usaha_ongoing' => 'required|array',
                    'usaha_ongoing.lokasi_operasional' => 'required|string|max:50',
                    'usaha_ongoing.tahun_berdiri' => 'required|string|max:4',
                    'usaha_ongoing.jumlah_karyawan' => 'required|string|min:1',
                    'usaha_ongoing.estimasi_omzet' => 'required|numeric|min:0',
                    'usaha_ongoing.biaya_operasional' => 'required|numeric|min:0',
                    'usaha_ongoing.rencana_penggunaan_dana' => 'required|string|min:10',
                    'usaha_ongoing.proyeksi_usaha' => 'required|string|min:10',
                    'usaha_ongoing.media_social' => 'required|string|min:3',
                ], [
                    'usaha_ongoing.required' => 'Data usaha ongoing tidak boleh kosong',
                    'usaha_ongoing.array' => 'Data usaha ongoing harus berupa array',

                    'usaha_ongoing.lokasi_operasional.required' => 'Lokasi operasional wajib diisi',
                    'usaha_ongoing.tahun_berdiri.required' => 'Tahun berdiri wajib diisi',
                    'usaha_ongoing.jumlah_karyawan.required' => 'Jumlah karyawan wajib diisi',
                    'usaha_ongoing.estimasi_omzet.required' => 'Estimasi omzet wajib diisi',
                    'usaha_ongoing.estimasi_omzet.numeric' => 'Estimasi omzet harus angka',
                    'usaha_ongoing.biaya_operasional.required' => 'Biaya operasional wajib diisi',
                    'usaha_ongoing.biaya_operasional.numeric' => 'Biaya operasional harus angka',
                    'usaha_ongoing.rencana_penggunaan_dana.required' => 'Rencana penggunaan dana wajib diisi',
                    'usaha_ongoing.proyeksi_usaha.required' => 'Proyeksi usaha wajib diisi',
                    'usaha_ongoing.media_social.required' => 'Media sosial wajib diisi',
                ]);

            \Log::info('Model data ready:', $validated);

            try {
                $wirausaha->update($validated);
                return redirect()->route('ongoingWirausaha.index')
                    ->with('success', 'Wirausaha Ongoing berhasil ditambahkan!');
            } catch (\Exception $e) {
                \Log::error('Error creating wirausaha:', ['error' => $e->getMessage()]);
                return redirect()->back()->withErrors([
                    'message' => 'Terjadi kesalahan saat menyimpan data: ' . $e->getMessage()
                ])->withInput();
            }
        } else {
            return redirect()->back()->withErrors([
                'user_id' => 'User yang dipilih bukan wirausaha yang valid'
            ])->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Wirausaha $wirausaha)
    {
        $wirausaha->delete();
        if ($wirausaha->tipe_usaha === 'Usaha Ongoing') {
        return redirect()->route('ongoingWirausaha.index')->with('success', 'Wirausaha berhasil dihapus');
            } elseif ($wirausaha->tipe_usaha === 'Usaha Baru') {
                return redirect()->route('newWirausaha.index')->with('success', 'Wirausaha berhasil dihapus');
            } else {
                return redirect()->route('wirausaha.index')->with('success', 'Wirausaha Berhasil Dihapus');
            }
    }
}