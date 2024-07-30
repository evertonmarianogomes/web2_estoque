<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Responsible;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $component = 'Admin/Products/Index';
        $props = [
            'title' => 'Produtos - ' . env('APP_NAME'),
            'products' => Product::getProductsWithCategory()
        ];

        return Inertia::render($component, $props);
    }


    public function updateQuantity(Request $request, string $id)
    {
        try {
            if ($request->operation == 'increment') {
                Product::where('id', '=', $id)->increment('quantity', $request->quantity);
            } else {
                Product::where('id', '=', $id)->decrement('quantity', $request->quantity);
            }
        } catch (Exception $ex) {
            return redirect()->back()->withErrors('Ocorreu um erro ao executar a query. ' . $ex->getMessage());
        }
    }

    public function updateProductsQuantity(Request $request)
    {
        try {
            DB::transaction(function () use ($request) {
                foreach ($request->data as $item) {
                    DB::table('products')->where('id', '=', $item['id'])->increment('quantity', $item['quantity']);
                }
            });
        } catch (Exception $ex) {
            return redirect()->back()->withErrors('Ocorreu um erro ao executar a query. ' . $ex->getMessage());
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'price' => 'required|numeric',
            'quantity' => 'required|numeric',
            'category' => 'required|numeric',
            'responsible' => 'required|numeric'
        ]);

        try {
            $product = new Product();
            $product->name = $request->name;
            $product->description = $request->description ? $request->description : '-';
            $product->price = $request->price;
            $product->quantity = (int) $request->quantity;
            $product->category_id = (int) $request->category;
            $product->responsible_id = (int) $request->responsible;

            $product->saveOrFail();

            return redirect()->back()->with('success', 'Produto criado com sucesso');
        } catch (Exception $ex) {
            return redirect()->back()->withErrors(`Ocorreu um erro ao executar a query. {$ex->getMessage()}`);
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
        try {
            $product = Product::findOrFail((int) $id);
            $categories = Category::all();
            $responsibles = Responsible::all();

            return [
                'product' => $product,
                'categories' => $categories,
                'responsibles' => $responsibles
            ];
        } catch (Exception $ex) {
            return redirect()->back()->withErrors(`Ocorreu um erro ao executar a query. {$ex->getMessage()}`);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required',
            'price' => 'required|numeric',
            'quantity' => 'required|numeric',
            'category' => 'required|numeric',
            'responsible' => 'required|numeric'
        ]);

        try {
            $product = Product::findOrFail((int) $id);
            $product->name = $request->name;
            $product->description = $request->description ? $request->description : '-';
            $product->price = $request->price;
            $product->quantity = (int) $request->quantity;
            $product->category_id = (int) $request->category;
            $product->responsible_id = (int) $request->responsible;

            $product->saveOrFail();

            return redirect()->back()->with('success', 'Produto atualizado com sucesso');
        } catch (Exception $ex) {
            return redirect()->back()->withErrors(`Ocorreu um erro ao executar a query. {$ex->getMessage()}`);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            /** @var Product $product */
            Product::destroy((int) $id);

            DB::statement('ALTER TABLE products AUTO_INCREMENT = 1');

            return redirect()->back()->with('success', 'Produto excluido com sucesso');
        } catch (Exception $ex) {
            return redirect()->back()->withErrors(`Ocorreu um erro ao executar a query. {$ex->getMessage()}`);
        }
    }
}
