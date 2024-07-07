<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();

        return Inertia::render('Admin/Stock/Categories/Index', ['title' => 'Categorias - ' . env('APP_NAME'), 'categories' => $categories]);
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
        $request->validate(['name' => 'required']);

        Category::create(['name' => $request->name, 'description' => ($request->description != '') ? $request->description : 'Descrição']);

        return redirect()->back()->with('success', 'Categoria criada com sucesso');
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
        $request->validate(['name' => 'required']);

        $category = Category::find($id);
        $category->name = $request->name;
        $category->description = ($request->description) ? $request->description : $category->description;

        return ($category->save()) ?
            redirect()->back()->with('success', 'Atualizado com sucesso') :
            redirect()->back()->withErrors('Erro ao atualizar, tente novamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        if (count($category->products()->get()) > 0) {

            return redirect()->back()->withErrors('Não é possível excluir, existem produtos associados a essa categoria');
        }

        $category->delete();

        return redirect()->back()->with('success', 'Excluído com sucesso');
    }
}
