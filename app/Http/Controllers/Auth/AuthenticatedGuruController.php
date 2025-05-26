<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginGuruRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedGuruController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Auth/LoginGuru', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    public function store(LoginGuruRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(route('guru.dashboard', absolute: false));

    }

    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('guru')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('loginGuru');
    }
}
