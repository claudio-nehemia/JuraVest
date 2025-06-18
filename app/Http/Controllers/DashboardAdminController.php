<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardAdminController extends Controller
{
    public function index() {
        $user = Auth::user()->load('role');
        
        if($user->role_id !== 3) {
            return redirect()->route('home');
        }
        
        return Inertia::render('dashboard', [
            'user' => $user,
        ]);
    }
}