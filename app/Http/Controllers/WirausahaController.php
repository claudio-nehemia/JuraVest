<?php

namespace App\Http\Controllers;

use App\Models\User;
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
        $wirausahas = Wirausaha::with('user', 'jenis_usaha', 'target_pasar')->get();

        // Filter tipe usaha
        if($request->has('tipe_usaha') && $request->tipe_usaha !== '') {
            $wirausahas->where('tipe_usaha', $request->tipe_usaha);
        }

        
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
    public function store(Request $request)
    {
        //
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
    public function edit(Wirausaha $wirausaha)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Wirausaha $wirausaha)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Wirausaha $wirausaha)
    {
        //
    }
}
