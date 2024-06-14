<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AppController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductStockController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\PreventBackHistory;

Route::get('/', [AppController::class, 'login'])->name('app.home');

Route::post('/validate', [LoginController::class, 'validateLogin'])->name('app.validateLogin');

Route::get('/notLoggedIn', [LoginController::class, 'notLoggedIn'])->name('admin.notLoggedIn');

Route::prefix('admin')->middleware(['auth', PreventBackHistory::class])->group(function () {
    Route::get('/', [AppController::class, 'home'])->name('admin.index');
    Route::get('/logout', [LoginController::class, 'logout'])->name('admin.logout');

    Route::get('/editAuthUser', [AppController::class, 'editAuthUser'])->name('admin.editAuthUser');

    Route::resources([
        'users' => UserController::class,
        'stock' => StockController::class,
        'categories' => CategoryController::class,
        'products' => ProductController::class,
        'sales' => SaleController::class
    ]);

    // Payments Route
    Route::post('/getPixCode', [AppController::class, 'getCode'])->name('pix.getCode');
});
