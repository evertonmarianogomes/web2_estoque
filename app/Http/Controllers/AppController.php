<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppController extends Controller
{
    public function login(Request $request)
    {
        return Inertia::render("Login", ["title" => "Login - " . env('APP_NAME')]);
    }

    public function HelloWorld()
    {
        return Inertia::render("hello", ["title" => "HelloWorld - Pizzaria Web 2"]);
    }


    public function validateLogin(Request $request)
    {
        // return redirect()->back()->with(['message' => 'Arrego']);
        return redirect()->back()->withErrors('Arrego ');
    }
}
