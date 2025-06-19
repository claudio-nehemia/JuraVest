<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::withCount('users')->orderBy('id','asc')->get();
        return Inertia::render('admin/role/index',[
            'roles' => $roles,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/role/form',[
            'mode' => 'create'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $validated = $request->validate([
            'role_name' => 'required|string|max:255',
            'icon' => 'nullable|image|mimes:png,jpg,jpeg'
        ]);

        if($request->hasFile('icon')) {
            $validated['icon'] = $request->file('icon')->store('role_icons', 'public');
        }

        Role::create($validated);

        return redirect()->route('role.index')->with('success','Role berhasil Ditambahkan');
    }
    
    public function edit(Role $role)
    {
        return Inertia::render('admin/role/form',[
            'role' => $role,
            'mode' => 'edit'
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role)
    {
        // dd($request->all());
        $validated = $request->validate([
            'role_name' => 'required|string|max:255',
            'icon' => 'nullable|image'
        ]);

        if($request->hasFile('icon')) {
            if($role->icon) {
                Storage::disk('public')->delete($role->icon);
            } 
            $validated['icon'] = $request->file('icon')->store('role_icons', 'public');
        } else {
            unset($validated['icon']);
        }

        $role->update($validated);

        return redirect()->route('role.index')->with('success','Role berhasil di Update');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        $role->delete();

        return redirect()->route('role.index')->with('success', 'Role berhasil dihapus');
    }
}
