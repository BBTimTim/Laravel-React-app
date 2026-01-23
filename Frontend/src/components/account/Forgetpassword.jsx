 import React from 'react';
import { useState } from 'react';
import config from '../../config';

const { api_url } = config;

const Forgetpassword = () => {
            const [email, setEmail] = useState('');
            const [errors, setErrors] = useState(null);
            const [message, setMessage] = useState(null);
            
                const handleChange = (e) => {
                     setEmail(e.target.value);
                  };
 
        
            const handleSubmit = async (e) => {
                    e.preventDefault();
               try{
                    const response = await fetch(`${api_url}/forgetpassword`, {
                        method: "POST",
                        headers: {
                             "Content-Type": "application/json",
                             'Accept': 'application/json',
                        },
                        body: JSON.stringify({email}),
                      });
    
                      const result = await response.json();
            
                    if (!response.ok) {
                            setErrors(result.message || 'Hiba történt');
                            setMessage(null);
                        } else {
                            setMessage(result.message);
                            setErrors(null);
                        }
                    } catch (error) {
                        console.log(error);
                        setErrors('Szerver hiba történt');
                        setMessage(null);
                    }
                };
        
            return (
                <div className='container'>
                <h1 className='mt-5 text-center'>Jelszó visszaállítása</h1>
                        { message && <div className='alert alert-success col-sm-6 mx-auto'>
                            {message}
                        </div>}
                        {errors && <div className='alert alert-danger col-sm-6 mx-auto'>
                            {errors}
                        </div>}
                        <form className='align-items-center' onSubmit={handleSubmit}>
                                <div className='row col-12 col-md-6 mx-auto p-2 g-2'>
                                    <input type="email" name='email' value={email} className='form-control' placeholder='Add meg az email címed' onChange={handleChange}/>
                                    <button className='btn btn-outline-secondary mt-4' type='submit'>Küldés </button>
                                </div>
                        </form>
                </div>
            );
}
            
export default Forgetpassword;
 