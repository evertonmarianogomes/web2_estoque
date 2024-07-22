<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AppController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\PreventBackHistory;

Route::get('/', [AppController::class, 'login'])->name('app.home');

Route::post('/validate', [LoginController::class, 'validateLogin'])->name('app.validateLogin');

Route::get('/notLoggedIn', [LoginController::class, 'notLoggedIn'])->name('admin.notLoggedIn');

Route::prefix('admin')->middleware(['auth', PreventBackHistory::class])->group(function () {
    Route::get('/', [AppController::class, 'home'])->name('admin.home');
    Route::get('/logout', [LoginController::class, 'logout'])->name('admin.logout');

    Route::get('/editAuthUser', [AppController::class, 'editAuthUser'])->name('admin.editAuthUser');
    Route::get('/hello', [AppController::class, 'HelloWorld'])->name('admin.helloworld');
    Route::get('/about', [AppController::class, 'About'])->name('app.about');


    Route::resources([
        'users' => UserController::class,
    ]);



    // Payments Route
    Route::post('/getPixCode', [AppController::class, 'getCode'])->name('pix.getCode');
});
