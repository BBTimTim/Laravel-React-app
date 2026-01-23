 import React from 'react';
import { useState } from 'react';
import config from '../../config';


const { api_url } = config;

export default function Resetpassword() {
         const [password, setPassword] = useState({
            password: '',
            password_confirmation: ''
        });
          const [errors, setErrors] = useState(null);
          const [message, setMessage] = useState(null);

          const handleChange = e => {
                 setPassword({...password, [e.target.name]: e.target.value});
                    }


          const handleSubmit = async (e) => {
            e.preventDefault()
                const urlParams = new URLSearchParams(window.location.search);
                const token = urlParams.get('token');
                const email = urlParams.get('email');
      try{
          const response = await fetch(`${api_url}/resetpassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({
                    token: token,
                    email: email,
                    password: password.password,
                    password_confirmation: password.password_confirmation
             }),
            });
            const result = await response.json();
            if (result.errors) {
                setErrors(result.errors); 
                setMessage("");
                       
            }else  if (result.message) {
                setMessage(result.message);   
                setErrors("");    
                return;
            }
            
        }catch (error) {
            console.error(error);          
            setErrors( error || "Ismeretlen hiba történt." );
        }
}

  return (
             <div className='container'>
                <h1 className='mt-5 text-center'>Új jelszó beállítása</h1>
                        { message && <div className='alert alert-success col-sm-6 mx-auto'>
                            {message}
                        </div>}
                        {errors && <div className='alert alert-danger col-sm-6 mx-auto'>
                            {errors}
                        </div>}
                        <form className='align-items-center' onSubmit={handleSubmit}>
                        <div className='row col-12 col-md-6 mx-auto p-2 g-2'>
                            <input  type="password"
                            name='password'
                            className='form-control'
                            value={password.password}
                            placeholder='Add meg az új jelszavad'
                            onChange={handleChange}
                            />
                     
                           <input type="password"
                            name='password_confirmation'
                            className='form-control'
                            value={password.password_confirmation}
                            placeholder='Add meg az új jelszavad újra'
                            onChange={handleChange}
                            />
                           <button className='btn btn-outline-secondary mt-4' type='submit'>Jelszó megerősítése!</button>
                         </div>
                        </form>
                </div>
  )
}
