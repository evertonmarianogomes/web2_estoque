<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all();
        $categories = Category::all();
        return Inertia::render('Admin/Stock/Products/Index', [
            'title' => 'Produtos - ' . env('APP_NAME'),
            'products' => $products,
            'categories' => $categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return Inertia::render('Admin/Products/Create', [
            'title' => 'Criar produto - ' . env('APP_NAME'),
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'price' => 'required|numeric',
            'cost_price' => 'required',
            'category' => 'required',
            'quantity' => 'required|numeric',
        ]);

        $product = new Product();
        $product->name = $request->name;
        $product->description = ($request->description) ? $request->description : 'Sem descrição';
        $product->price = ((float) $request->price);
        $product->cost = ((float) $request->cost_price);
        $product->category_id = (int) $request->category;
        $product->quantity = (int) $request->quantity;

        $product->save();

        return redirect()->back()->with('success', 'Produto Criado com Sucesso');
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
        $product = Product::find($id);

        if (!$product) abort(404);

        $product->category;

        return Inertia::render('Admin/Products/Edit', [
            "title" => 'Editar produto - ' . env('APP_NAME'),
            'product' => $product,
            'categories' => Category::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required',
            'price' => 'required|numeric',
            'cost' => 'required',
            'category' => 'required',
            'quantity' => 'required|numeric',
        ]);

        $product = Product::find($id);

        $product->name = $request->name;
        $product->price = ((float) $request->price);
        $product->cost = ((float) $request->cost);
        $product->category_id = (int) $request->category;
        $product->quantity = (int) $request->quantity;

        $product->save();

        return redirect()->back()->with('success', 'Produto atualizado com sucesso');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::find($id);
        $product->delete();
        return redirect()->back()->with('success', 'Produto excluido com sucesso');
    }
}
