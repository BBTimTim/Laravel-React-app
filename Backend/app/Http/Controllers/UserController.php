<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
  public function updatedata(Request $request) {
      $user = $request->user();
      try {
          $validated = $request->validate([
              'name' => ['required', 'min:4', 'max:30'],
              'email' => ['required', 'email', 'unique:users,email,' . $user->id],
              'password' => ['nullable', 'min:4', 'max:30', 'confirmed'],
          ]);
        } catch(ValidationException $e){
          return response([ 'errors' => $e->errors() ]);
      }

      $dataToUpdate = [
          'name'  => $validated['name'],
          'email' => $validated['email'],
      ];
  
      if (!empty($validated['password'])) {
          $dataToUpdate['password'] = $validated['password']; 
      }
      $user->fill($dataToUpdate); //feltölti a modellt de nem ment
      
      // Ha semmi nem változott → hibaüzene
      if (!$user->isDirty()) {
        return response()->json([
          'errors' => ['Az adatok nem változtak.'] 
        ]);
      }

      $user->save();
      return response()->json(['success' => 'Sikeres adatmódosítás!']);
  }
  
   public function logout(Request $request) {
      $request->user()->currentAccessToken()->delete();
     return response()->noContent();
    }

}
