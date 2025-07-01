<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function redirectIfLoggedIn()
    {
        if (Auth::check()) {
            return redirect()->route('home');
        }

        return Inertia::render('front/welcome');
    }

}
