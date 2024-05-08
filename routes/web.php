<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AppController;

Route::get('/', [AppController::class, 'hello'])->name('app.home');

Route::get('/HelloWorld', [AppController::class, 'HelloWorld'])->name('app.helloWorld');
