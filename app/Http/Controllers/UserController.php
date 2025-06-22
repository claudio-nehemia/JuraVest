<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with('role')->paginate(10);
        return Inertia::render('admin/user/index',[
            'users' => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = Role::select('id', 'role_name')->get();
        return Inertia::render('admin/user/form', [
            'roles' => $roles,
            'mode' => 'create'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email',
            'password' => ['required','confirmed', Password::default()],
            'role_id' => 'required|integer|exists:roles,id',
            'no_telp' => 'nullable|string|max:15',
            'foto_profil' => 'nullable|image'
        ]);

        if($request->hasFile('foto_profil')) {
            $validated['foto_profil'] = $request->file('foto_profil')->store('user_profiles','public');
        }

        $validated['password'] = Hash::make($validated['password']);

        User::create($validated);

        return redirect()->route('user.index')->with('success', 'User Berhasil Ditambahkan');
    }

    /**
     * Display the specified resource.
     */

    public function edit(string $id)
    {
        $user = User::findOrFail($id);
        $roles = Role::select('id','role_name')->get();
        return Inertia::render('admin/user/form',[
            'user' => $user,
            'roles' => $roles,
            'mode' => 'edit'
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email,' . $user->id,
            'password' => ['nullable', 'confirmed', Password::default()],
            'role_id' => 'required|integer|exists:roles,id',
            'no_telp' => 'nullable|string|max:15',
            'foto_profil' => 'nullable|image'
        ]);

        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        if($request->hasFile('foto_profil')) {
            if($user->foto_profil) {
                Storage::disk('public')->delete($user->foto_profil);
            }
            $validated['foto_profil'] = $request->file('foto_profil')->store('user_profiles', 'public');
        } else {
            unset($validated['foto_profil']);
        }

        $user->update($validated);

        return redirect()->route('user.index')->with('success', 'Data User Berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);

        $user->delete();

        return redirect()->route('user.index')->with('success','User Berhasil Dihapus');
    }
}
