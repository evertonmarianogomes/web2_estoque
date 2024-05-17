<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'email|required',
            'login' => 'required|max:25'
        ]);

        if ($request->password != '') $request->validate(['password' => 'required|min:6']);

        $user = User::find((int) $request->id);
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $user->login = $request->login;

        if ($request->password != '') $user->password = Hash::make($request->password);

        $t = $user->isDirty() ? 'true' : "false";

        if (!$user->isDirty()) return redirect()->back()->with('message', 'Atualizado com sucesso');

        $user->save();

        if ($user->id == $request->user()->id) {
            if (Auth::attempt(["login" => $user->login, "password" => $user->password])) {
                $request->session()->invalidate();
                $request->session()->regenerateToken();
                $request->session()->regenerate();
            }
        }

        return redirect()->back()->with('success', 'Usuário "' . $user->login . '" atualizado com');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
