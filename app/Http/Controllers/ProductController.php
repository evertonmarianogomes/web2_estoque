<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use IntlChar;
use PhpParser\Node\Stmt\Return_;

class ProductController extends Controller
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


        if ($request->hasFile('image')) {
            // Get filename with the extension
            $filenameWithExt = $request->file('image')->getClientOriginalName();
            // Get just filename
            $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            // Get just ext
            $extension = $request->file('image')->getClientOriginalExtension();

            // Filename to store
            $fileNameToStore = hash('md5', $filename . '_' . time()) . '.' . $extension;

            $path = $request->file('image')->storeAs('public/images', $fileNameToStore);
        } else {
            $fileNameToStore = 'noimage.png';
        }

        $product = new Product();
        $product->name = $request->name;
        $product->description = ($request->description) ? $request->description : '-';
        $product->price = ((float) $request->price) / 100;
        $product->cost_price = ((float) $request->cost_price) / 100;
        $product->image_url = $fileNameToStore;
        $product->category_id = (int) $request->category;
        $product->quantity = (int) $request->quantity;
        $product->is_available  = 1;

        $product->save();

        return redirect()->route('stock.index')->with('success', 'Produto Criado com Sucesso');
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
            'product_name' => 'required',
            'price' => 'required|numeric',
            'cost_price' => 'required',
            'product_category' => 'required',
            'product_quantity' => 'required|numeric',
            'is_available' => 'required|numeric'
        ]);

        $product = Product::find($id);

        $product->name = $request->product_name;
        $product->price = ((float) $request->price) / 100;
        $product->cost_price = ((float) $request->cost_price) / 100;
        $product->category_id = (int) $request->product_category;
        $product->quantity = (int) $request->product_quantity;
        $product->is_available = (int) $request->is_available;

        if ($request->hasFile('product_image')) {
            $request->validate(['product_image' => 'required|file|mimes:jpeg,png,jpg,gif,svg|max:4196']);

            $oldName = $product->image_url;
            if ($oldName != 'noimage.png') Storage::delete('public/images/' . $oldName);

            // Get filename with the extension
            $filenameWithExt = $request->file('product_image')->getClientOriginalName();
            // Get just filename
            $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            // Get just ext
            $extension = $request->file('product_image')->getClientOriginalExtension();

            // Filename to store
            $fileNameToStore = hash('md5', $filename . '_' . time()) . '.' . $extension;

            $path = $request->file('product_image')->storeAs('public/images', $fileNameToStore);

            $product->image_url = $fileNameToStore;
        }

        $product->save();

        return redirect()->route('stock.index')->with('success', 'Produto atualizado com sucesso');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::find($id);
        $oldName = $product->image_url;
        $product->delete();
        Storage::delete('public/images/' . $oldName);

        return redirect()->route('stock.index')->with('success', 'Produto excluido com sucesso');
    }
}
