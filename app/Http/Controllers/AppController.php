<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class AppController extends Controller
{
    public function login(Request $request)
    {
        if (Auth::check()) {
            return redirect()->route('admin.home')->with('message', 'Bem vindo');
        } else {
            return Inertia::render("Login", ["title" => "Login - " . env('APP_NAME')]);
        }
    }

    public function HelloWorld()
    {
        return Inertia::render("hello", ["title" => "HelloWorld - Pizzaria Web 2"]);
    }


    public function home(Request $request)
    {
        return Inertia::render('Admin/Home', ["title" => "Home - " . env('APP_NAME')]);
    }

    public function About(Request $request)
    {
        return Inertia::render('Admin/About', ["title" => "Sobre - " . env('APP_NAME')]);
    }


    // Edit authenticated User - admin
    public function editAuthUser(Request $request)
    {
        return Inertia::render('Admin/EditUser', ['title' => 'Editar usuário - ' . env('APP_NAME')]);
    }

    // public function getCode(Request $request)
    // {
    //     $amount = (float) $request->amount;

    //     $pixController = new PixController();
    //     $description = 'Louvorzao 2024';
    //     $merchantName = 'Pizzaria Web 2';
    //     $merchantCity = 'Campo Grande';
    //     $referenceLabel = 'ID123456';

    //     $payload = $pixController->montaPayload($description, $amount, $merchantName, $merchantCity, $referenceLabel);

    //     $qrcode = new QRCode();
    //     $qrImage = $qrcode->render($payload);

    //     return json_encode(['qrCode' => $qrImage, 'payload' => $payload]);
    // }
}
