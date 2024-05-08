<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AppController extends Controller
{
    public function hello()
    {
        return Inertia::render("Login", ["title" => "Login - " . env('APP_NAME')]);
    }

    public function HelloWorld()
    {
        return Inertia::render("hello", ["title" => "HelloWorld - Pizzaria Web 2"]);
    }
}
