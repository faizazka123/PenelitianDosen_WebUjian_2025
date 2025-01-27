<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardGuruController extends Controller
{
    public function index()
    {
        $userId = Auth::id(); // Get the ID of the currently authenticated user
        dd($userId);
    }
}
