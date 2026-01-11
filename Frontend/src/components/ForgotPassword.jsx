/* import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
            const [email, setEmail] = useState('');
            const [errors, setErrors] = useState([]);
            const [status, setStatus] = useState(null);
            
            const handleChange = e => {
                setEmail({email, [e.target.name]: e.target.value})
            }
        
            const handleSubmit = async (e) => {
                    e.preventDefault();
        
                    const data = await fetch("http://codiva.fejlessz.hu/api/login", {
                        method: "POST",
                        headers: {
                             "Content-Type": "application/json",
                             'Accept': 'application/json',   
                        },
                        body: JSON.stringify(loginData),
                        credentials: 'include',
                      });
        
                      const result = await data.json();
        
                      if( result.errors ) {
                        setErrors(result.errors)
                        setSuccess(null)
                      }else if(result.success){
                          localStorage.setItem('token', result.token)
                          setSuccess(result.success)
                          setErrors(null)
                      }else{
                          alert('Ismeretlen hiba keletkezett!');
                      }
                }
            
        
            return (
                <div className='container'>
                <h1 className='mt-5 text-center'>Belépés</h1>
                        { success && <div className='alert alert-success col-sm-6 mx-auto'>
                            {success}
                        </div>}
                        {errors && <div className='alert alert-danger col-sm-6 mx-auto'>
                            {errors}
                        </div>}
                        <form className='align-items-center' onSubmit={handleSubmit}>
                                <div className='row col-12 col-md-6 mx-auto p-2 g-2'>
                                    <input type="text" name='email' className='form-control' placeholder='Add meg az email címed' onChange={handleChange}/>
                                    <button className='btn btn-outline-secondary mt-4' type='submit'>Email küldése</button>
                                </div>
                        </form>
                </div>
            );
}

export default ForgotPassword;
 */