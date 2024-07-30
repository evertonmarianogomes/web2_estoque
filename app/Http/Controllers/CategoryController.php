<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;
use Exception;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Categories/Index', [
            'title' => 'Categorias - ' . env('APP_NAME'),
            'categories' => Category::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }


    public function getProductsByCategory(string $id)
    {
        /** @var Category $category */
        $category = Category::findOrFail((int) $id);
        return $category->products();
    }

    public function getAllCategories()
    {
        return Category::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required'
        ]);

        try {
            $category = new Category();
            $category->name = $request->name;
            $category->description = ($request->description == '') ? 'Produto sem descrição' : $request->description;
            $category->saveOrFail();

            return redirect()->back()->with('success', 'Categoria criada com sucesso');
        } catch (Exception $ex) {
            return redirect()->back()->withErrors('Ocorreu um erro ao executar a query. ' . $ex->getMessage());
        }
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
            'name' => 'required'
        ]);

        try {
            /** @var Category $category */
            $category = Category::findOrFail((int) $id);
            $category->name = $request->name;
            $category->description = ($request->description == '') ? 'Categoria sem descrição' : $request->description;
            $category->saveOrFail();

            return redirect()->back()->with('success', 'Categoria atualizada com sucesso');
        } catch (Exception $ex) {
            return redirect()->back()->withErrors('Ocorreu um erro ao executar a query. ' . $ex->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            /** @var Category $category */
            $category = Category::findOrFail((int) $id);

            $category->deleteOrFail();

            return redirect()->back()->with('success', 'Categoria excluída com sucesso!');
        } catch (Exception $ex) {
            return redirect()->back()->withErrors('Ocorreu um erro ao executar a query. ' . $ex->getMessage());
        }
    }
}
