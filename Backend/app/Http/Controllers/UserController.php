<?php

namespace App\Http\Controllers;

use Mail;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
  public function updateData(Request $request)
  {
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
      
      // Ha semmi nem változott → hibaüzenet
      if (!$user->isDirty()) {
        return response()->json([
          'errors' => ['Az adatok nem változtak.'] 
        ]);
      }

      $user->save();
      return response()->json(['success' => 'Sikeres adatmódosítás!']);
  }
  

    function logOut(Request $request) {
      $request->user()->currentAccessToken()->delete();
     return response()->noContent();
    }
 

  }
   /*  public function forgotpassword(Request $request)
    {
        $email = $request->email; //eltároljuk az emailt
        $user = User::where('email', $request->email)->first();
        if($user){
            $password = Str::random(10); //random jelszó
            Mail::send([],[],function($message) use($email, $password){
                $message->to($email)
                        ->subject("Reset Password")
                        ->html("<p>Tour New Password is</p><br/>".$password);
            });
            User::where('email', $email)->update(['password'=>Hash::make($password)]);
            return response(['status'=>'success','message'=>'New Password send in your email']);
        }else{
            return response(['status'=>'error','message'=>'User Not Found']);
        }
    } */

    /* function forgotPassword(Request $request) {
      $request ->validate(['email' => 'required|email']);

      $status = Password::sendResetLink(
        $request->only('email')
      );

      return $status === Password::RESET_LINK_SENT
      ? response() ->json([
        'message'=> trans($status),
      ])
      : response()->json([
        "message" => trans($status),
      ], 400)
    }
} */
