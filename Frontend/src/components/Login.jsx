import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import config from '../Config';

const { api_url } = config;

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password:'',
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleChange = e => {
        setLoginData({...loginData, [e.target.name]: e.target.value})
    }

  useEffect(() => {
            const token = localStorage.getItem('token')
            if (!token) {
            setLoading(false)
            return;
            }
            fetch(`${api_url}/user`, {
                headers: {
                   'Authorization': `Bearer ${token}`
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
        e.preventDefault();
        
        if (!loginData.email || !loginData.password) {
            setErrors( "Kérlek tölts ki minden mezőt!" );
            return;
        }
       try{
        const response = await fetch(`${api_url}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(loginData),
        });
        
        const result = await response.json();
        if (result.errors) {
            setErrors(result.errors); 

        }else if(result.success) {
            localStorage.setItem('token', result.token);
            navigate('/profile');  
            return;
        }

    } catch (error) {
        setErrors(error || "Ismeretlen hiba történt");
        console.error(error);
    }
}

    return (
        <>{loading ? <>Loading...</> :  <div className='container'>
            <h1 className='mt-5 text-center'>Belépés</h1>
                    {errors && <div className='alert alert-danger col-sm-6 mx-auto'>
                        {errors}
                    </div>}
                    <form className='align-items-center' onSubmit={handleSubmit}>
                            <div className='row col-12 col-md-6 mx-auto p-2 g-2'>
                                <input type="text" name='email' className='form-control' placeholder='Add meg az email címed' onChange={handleChange}/>
                                <input type="password" name='password' className='form-control' placeholder='Add meg a jelszavad' onChange={handleChange}/>
                                <button className='btn btn-outline-secondary mt-4' type='submit'>Belépés</button>
                                <Link className='text-center' to="">Elfelejtett jelszó</Link>
                            </div>
                    </form>
            </div> } </>
    );
}

export default Login;