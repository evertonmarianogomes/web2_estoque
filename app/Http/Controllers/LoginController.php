<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function validateLogin(Request $request)
    {
        $request->validate(
            [
                'login' => 'required|min:1|max:25',
                'password' => 'required|min:6'
            ]
        );

        $login = $request->login;
        $password = $request->password;

        if (Auth::attempt(["login" => $login, "password" => $password])) {
            $request->session()->regenerate();
            return redirect()->intended(route('admin.home'))->with('success', 'Bem vindo');
        } else {
            return redirect()->back()->withErrors('Usuário e/ou senha incorretos');
        }
    }


    // Logout Admin
    public function logout(Request $request)
    {

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        Auth::logout();

        return redirect()->route('app.home')->with('success', 'Usuário desconectado com sucesso');
    }

    public function notLoggedIn(Request $request)
    {
        return redirect()->route('app.home')->withErrors('Somente usuários autenticados podem acessar esse endereço');
    }
}
