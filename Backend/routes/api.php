<?php

use App\Http\Controllers\GuestController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [GuestController::class, 'register']);

Route::post('/login', [GuestController::class, 'login']);

Route::patch('/updateData', [UserController::class, 'updateData'])->middleware('auth:sanctum');

Route::post('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');
 
/* Route::post('forgot-password', [UserController::class, 'forgotPassword']);

Route::post('reset-password', [UserController::class, 'resetPassword'])->name('password.reset');
  */

/* Route::get('/forgot-password', function () {
    return view('auth.forgot-password');
})->middleware('guest')->name('password.request');
 */
/* Route::post('/tokens/create', function (Request $request) {
    $token = $request->user()->createToken($request->token_name);
 
    return ['token' => $token->plainTextToken]; 
    return $user->createToken('token-name', ['server:update'])->plainTextToken;
 });  */

/* Route::get('/orders', function () {
    // Token has both "check-status" and "place-orders" abilities...
})->middleware(['auth:sanctum', 'abilities:check-status,place-orders']); */

/* Route::get('/orders', function () {
    // Token has the "check-status" or "place-orders" ability...
})->middleware(['auth:sanctum', 'ability:check-status,place-orders']); */

// Preflight handler minden API útvonalra
