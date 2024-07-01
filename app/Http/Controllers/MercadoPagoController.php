<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;



class MercadoPagoController extends Controller
{


    public function ProcessPayment(Request $request)
    {
        return $request;
    }

    public function HelloWorld(Request $request)
    {
        return Inertia::render("hello", ["title" => "HelloWorld MP - Pizzaria Web 2"]);
    }
}
