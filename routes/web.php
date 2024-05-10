<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AppController;

Route::get('/', [AppController::class, 'login'])->name('app.home');

Route::get('/HelloWorld', [AppController::class, 'HelloWorld'])->name('app.helloWorld');

Route::post('/validate', [AppController::class, 'validateLogin'])->name('app.validateLogin');
