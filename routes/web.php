<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AppController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\PreventBackHistory;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ResponsibleController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\PaymentMethodController;

Route::get('/', [AppController::class, 'login'])->name('app.home');

Route::post('/validate', [LoginController::class, 'validateLogin'])->name('app.validateLogin');

Route::get('/notLoggedIn', [LoginController::class, 'notLoggedIn'])->name('admin.notLoggedIn');

Route::prefix('admin')->middleware(['auth', PreventBackHistory::class])->group(function () {
    Route::get('/', [AppController::class, 'home'])->name('admin.home');
    Route::get('/logout', [LoginController::class, 'logout'])->name('admin.logout');

    Route::get('/editAuthUser', [AppController::class, 'editAuthUser'])->name('admin.editAuthUser');
    Route::get('/hello', [AppController::class, 'HelloWorld'])->name('admin.helloworld');


    Route::get('/categories/{id}/products', [CategoryController::class, 'getProductsByCategory'])->name('categories.products');

    Route::get('/categories/all', [CategoryController::class, 'getAllCategories'])->name('categories.all');

    Route::post('/products/{id}/quantity', [ProductController::class, 'updateQuantity'])->name('products.quantity');
    Route::post('/products/quantity', [ProductController::class, 'updateProductsQuantity'])->name('products.quantityAll');

    Route::post('/paymentMethods/all', [PaymentMethodController::class, 'all'])->name('paymentMethods.all');

    Route::resources([
        'users' => UserController::class,
        'categories' => CategoryController::class,
        'products' => ProductController::class,
        'responsibles' => ResponsibleController::class,
        'sales' => SaleController::class,
        'payment_methods' => PaymentMethodController::class
    ]);
});
