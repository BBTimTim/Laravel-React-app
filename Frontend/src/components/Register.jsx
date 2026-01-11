import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../Config';

const { api_url } = config;

const Register = () => {
    const [register, setRegister] = useState({
        name: '',
        email: '',
        password:'',
        password_confirmation:''
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleChange = e => {
        setRegister({...register, [e.target.name]: e.target.value})
    }

     useEffect(() => {
                const token = localStorage.getItem('token')
                if (!token) {
                setLoading(false)
                return;
                }
            fetch(`${api_url}/user`, {
                headers: {
                   'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
              }).then(res => {
                   if(res.ok) {
                    navigate('/profile')
              } else {
                setLoading(false)
              }
            })
          }, [navigate])

    const handleSubmit = async (e) => {
            e.preventDefault()
            try{
            const response = await fetch(`${api_url}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(register),
            });
            const result = await response.json();
            if (result.errors) {
                setErrors(result.errors); 
                setSuccess("");
                       
            }else  if (result.success) {
                setSuccess(result.success);   
                setErrors("");    
                return;
            }
            
        } catch (error) {
            console.error(error);          
            setErrors( error || "Ismeretlen hiba történt." );
        }
}

    return (
        <>{loading ? <>Loading...</> : <div className='container'>
            <h1 className='mt-5 text-center'>Regisztráció</h1>
             { success && <div className='alert alert-success col-sm-6 mx-auto'>
                    {success}
                </div>}
                {errors && <div className='alert alert-danger col-sm-6 mx-auto'>{function() {
                        const result = []
                        for(let key in errors) {
                            result.push(<li key={key}>{errors[key]}</li>)
                        }
                        return result;
                    }() }</div>}
                <form className='align-items-center' onSubmit={handleSubmit}>
                <div className='row col-12 col-md-6 mx-auto p-2 g-2'>
                    <input type="text"
                            name='name'
                            className='form-control'
                            placeholder='Add meg a neved'
                            onChange={handleChange}
                            />
                               
                    <input  type="text"
                            name='email'
                            className='form-control'
                            placeholder='Add meg az email címed'
                            onChange={handleChange}
                             />
                    
                    <input  type="password"
                            name='password'
                            className='form-control'
                            placeholder='Add meg a jelszavad'
                            onChange={handleChange}
                            />
                    
                    <input type="password"
                            name='password_confirmation'
                            className='form-control'
                            placeholder='Add meg a jelszavad újra'
                            onChange={handleChange}
                            />
                    <button className='btn btn-outline-secondary mt-4 reg-btn' type='submit'>Regisztráció</button>
                    </div>
                    </form>
             </div>} </>
    );
}

export default Register;
