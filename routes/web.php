<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AppController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;

Route::get('/', [AppController::class, 'login'])->name('app.home');

Route::get('/HelloWorld', [AppController::class, 'HelloWorld'])->name('app.helloWorld');

Route::post('/validate', [LoginController::class, 'validateLogin'])->name('app.validateLogin');


Route::get('/notLoggedIn', [LoginController::class, 'notLoggedIn'])->name('admin.notLoggedIn');

Route::prefix('admin')->middleware(['before' => 'auth'])->group(function () {
    Route::get('/', [AppController::class, 'home'])->name('admin.index');
    Route::get('/logout', [LoginController::class, 'logout'])->name('admin.logout');

    Route::get('/editAuthUser', [AppController::class, 'editAuthUser'])->name('admin.editAuthUser');

    Route::resource('users', UserController::class);
});
