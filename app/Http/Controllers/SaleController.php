<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Product;
use App\Models\Sale;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $component = [
            'name' => "Admin/Sales/Index",
            'props' => [
                "title" => 'Vendas - ' . env('APP_NAME')
            ]
        ];

        return Inertia::render($component['name'], $component['props']);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Sales/Create', [
            'title' => 'Nova venda - ' . env('APP_NAME'),
            'products' => Product::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'clientName' => 'required',
            'paymentList' => 'required|array',
            'products' => 'required|array',
            'saleAmount' => 'required|numeric',
            'saleTotalPaid' => 'required|numeric'
        ]);

        try {
            $client = Client::firstOrCreate(
                ['name' => strtoupper($request->clientName)], // Condição para verificar a existência
                ['name' => strtoupper($request->clientName)]  // Dados a serem inseridos se não existir
            );

            /** @var Sale $sale */
            $sale = new Sale();
            $sale->description = 'Venda padrão';
            $sale->status = $this->verifySaleStatus($request->paymentList);
            $sale->client_id = (int) $client->id;
            $sale->saveOrFail();

            $products = [];
            $payments = [];

            foreach ($request->products as $product) {
                /** @var Product $prodModel */
                $prodModel = Product::find((int) $product['id']);

                if ($prodModel->quantity >= $product['quantity']) {
                    array_push($products, [
                        'product_id' => $product['id'],
                        'sale_id' => $sale->id,
                        'amount' => $product['amount'],
                        'unit_price' => $product['price'],
                        'quantity' => $product['quantity']
                    ]);

                    $prodModel->decrement('quantity', $product['quantity']);
                } else {
                    $sale->deleteOrFail();
                    throw new Exception('Estoque insuficiente!');
                }
            }

            foreach ($request->paymentList as $payment) {
                array_push($payments, [
                    'payment_method_id' => $payment['id'],
                    'sale_id' => $sale->id,
                    'amount' => $payment['value'],
                    'fees' => $payment['fees']
                ]);
            }

            DB::table('sale_items')->insert($products);
            DB::table('payments')->insert($payments);

            return redirect()->back()->with('success', 'Venda registrada com sucesso');
        } catch (Exception $ex) {
            return redirect()->back()->withErrors('Ocorreu um erro ao executar a query. ' . $ex->getMessage());
        }
    }

    private function verifySaleStatus(array $paymentList): int
    {
        $status = 0;
        foreach ($paymentList as $payment) {
            if ($payment['id'] == 5) {
                $status = 1;
            }
        }

        return $status;
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
