<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class GuestController extends Controller
{
    function register(Request $request) {
        try {
          $validated = $request->validate([
            'name' => ['required', 'min:4', 'max:30'],
            'email' => ['required', 'email', 'unique:users'],
            'password' => ['required', 'min:4', 'max:30', 'confirmed'],
           ]);
        } catch(ValidationException $e){
             return response([ 'errors' => $e->errors() ]);
    }
     User::create($validated);

     return response(['success' => 'Sikeres regisztráció!']);
}

    function login(Request $request) {
        $user = User::where('email', $request->email)->first();
        
        if( $user->id ?? false ) {
            if(Hash::check($request->password, $user->password)){
                $token = $user->createToken('mytoken')->plainTextToken; 
                return response(['success' => 'Sikeresen bejelentkeztél!', 'token' => $token]);
            }else{
                return response(['errors' => 'Hibás email vagy jelszó!']);
            }
        }
    }

}