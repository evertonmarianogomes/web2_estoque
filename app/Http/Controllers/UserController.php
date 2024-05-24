<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // var_dump($request->user()->roles[0]->id);
        if ($request->user()->roles[0]->id != 1) abort(403);

        $users = User::all();
        foreach ($users as $user) $user->getAllPermissions();

        return Inertia::render('Admin/Users/Index', ['title' => 'Usuários - ' . env('APP_NAME'), 'users' => $users]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = Role::all();
        return Inertia::render('Admin/Users/Create', ['title' => 'Criar usuário - ' . env('APP_NAME'), 'roles' => $roles]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'user_type' => 'required|numeric',
            'email' => 'email|required',
            'login' => 'required|max:25',
            'password' => 'required|min:6'
        ]);

        $role = Role::findById($request->user_type);

        if (!$role) {
            return redirect()->back()->withErrors('Regra não existe');
        } else {
            $user = new User();
            $user->first_name = $request->first_name;
            $user->last_name = $request->last_name;
            $user->email = $request->email;
            $user->login = $request->login;
            $user->password = Hash::make($user->password);
            $user->assignRole($role);
            if ($user->save()) {
                return redirect()->route('users.index')->with('success', 'Usuário criado com sucesso');
            }
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        abort(404);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, string $id)
    {
        if ($request->user()->roles[0]->id != 1) abort(403);

        $user = User::findOrFail($id);
        $user['role'] = $user->roles[0]->id;
        $roles = Role::all();

        return Inertia::render('Admin/Users/Edit', ['title' => 'Editar usuário - ' . env('APP_NAME'), 'user_edit' => $user, 'roles' => $roles]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Update User
        $validateRules = [
            'first_name' => 'required', 'last_name' => 'required', 'login' => 'required', 'email' => 'required|email', 'role' => 'required|numeric'
        ];

        if (!empty($request->password)) $validateRules['password'] = 'required|min:6';
        $request->validate($validateRules);

        $user = User::find($request->id);

        if ($user == null) {
            return redirect()->back()->withErrors('404 - Not Found');
        } else {
            if ($this->updateUserDb($user, $request)) {
                $role = Role::findById($request->role);

                if ($user->id == $request->user()->id) {
                    if (Auth::attempt(["login" => $user->login, "password" => $user->password])) {
                        $request->session()->invalidate();
                        $request->session()->regenerateToken();
                        $request->session()->regenerate();
                    }
                } else {
                    $user->roles()->detach();
                    $user->assignRole($role);
                }

                return redirect()->route('users.index')->with('success', 'Usuário alterado com sucesso');
            } else {
                return redirect()->route('users.index')->withErrors('Erro ao atualizar, tente novamente');
            }
        }
    }


    private function updateUserDb(User $user, $request)
    {
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $user->login = $request->login;
        if (!empty($request->password)) $user->password = Hash::make($request->password);

        return $user->save();
    }


    private function updateUser(Request $request)
    {
        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'email|required',
            'login' => 'required|max:25'
        ]);

        if ($request->password != '') $request->validate(['password' => 'required|min:6']);

        $user = User::find((int) $request->user()->id);
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $user->login = $request->login;

        if ($request->password != '') $user->password = Hash::make($request->password);


        if (!$user->isDirty()) return redirect()->back()->with('message', 'Atualizado com sucesso');

        $user->save();

        if ($user->id == $request->user()->id) {
            if (Auth::attempt(["login" => $user->login, "password" => $user->password])) {
                $request->session()->invalidate();
                $request->session()->regenerateToken();
                $request->session()->regenerate();
            }
        }

        return redirect()->back()->with('success', 'Usuário "' . $user->login . '" atualizado com sucesso');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        if (Auth::user()->id == $user->id) {
            return redirect()->route("admin.index")->withErrors('Erro ao excluir');
        } else if ($user->delete()) {
            return redirect()->route("users.index")->with('success', 'Usuário excluido com sucesso');
        } else {
            return redirect()->route("admin.index")->withErrors('Erro ao excluir');
        }
    }
}
