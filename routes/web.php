<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index']);

Route::get('/formulir', function () {
  return Inertia::render('Formulir/Formulir');
});
