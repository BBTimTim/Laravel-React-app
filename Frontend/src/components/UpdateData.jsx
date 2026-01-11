import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../Config';

const { api_url } = config;

const UpdateData = () => {

         const [updateData, setUpdateData] = useState({   
            name: '',
            email: '',
            password:'',
            password_confirmation:''});
      
          const [errors, setErrors] = useState(null);
          const [success, setSuccess] = useState(null);
          const [user, setUser] = useState(null);
          const navigate = useNavigate();
       
          const handleChange = e => {
              setUpdateData({...updateData, [e.target.name]: e.target.value})
          }

  useEffect(() => {
        fetch(`${api_url}/user`, {
            headers: {
               'Authorization': `Bearer `+localStorage.getItem('token')
            }
          }).then(res => {
               if(!res.ok) {
                navigate('/login')
          } 
          return res.json()
        }  )
        .then(res => {
          setUser( res )
        } )
        }, [navigate])
 
        useEffect(() => {
            if (user) {
                setUpdateData({
                    name: user.name,
                    email: user.email,
                    password: '',
                    password_confirmation: ''
                });
            }
        }, [user]);

        const handleFocus = e => {
            const name = e.target.name;
            if (updateData[name] === user[name]) {
              setUpdateData(prev => ({ ...prev, [name]: '' })); 
            } 
          };
          
        const handleSubmit = async (e) => {
            e.preventDefault();
            try{
                const response = await fetch(`${api_url}/updateData`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer `+localStorage.getItem('token')
                },
                body: JSON.stringify(updateData),
            })
            const result = await response.json();

                        if (result.errors) {
                            setErrors(result.errors);        
                            setSuccess("");  
                            return;
                        }  else  if (response.ok && result.success) {
                            setSuccess(result.success);
                            setErrors("");
                            return;
                        }
                
                    } catch (error) {
                        console.error(error);
                        setErrors(error || "Hálózati hiba történt." );
                    }
}

          return (
           <>{ user !== null ?  <div className='container'>
              <h1 className='mt-5 text-center'>Adataim módosítása</h1>
               { success && <div className='alert alert-success col-sm-6 mx-auto'>
                      {success}
                  </div>}
                  {errors && Object.keys(errors).length > 0 && //csak hiba esetén renderel
                  <div className='alert alert-danger col-sm-6 mx-auto'>
                    <ul className="mb-0">
                    {function() {
                          const result = []
                          for(let key in errors) {
                              result.push(<li key={key}>{errors[key]}</li>)
                          }
                          return result;
                      }() }
                      </ul></div>}
                  <form className='align-items-center' onSubmit={handleSubmit}>
                  <div className='row col-12 col-md-6 mx-auto p-2 g-2'>
                      <input type="text"
                              name='name'
                              className='form-control'
                              placeholder='Add meg a neved'
                              onChange={handleChange}
                              value={updateData.name}
                              onFocus={handleFocus}
                              />
                                 
                      <input  type="text"
                              name='email'
                              className='form-control'
                              placeholder='Add meg az email címed'
                              onChange={handleChange}
                              value={updateData.email}
                              onFocus={handleFocus}
                               />
                      
                      <input  type="password"
                              name='password'
                              className='form-control'
                              placeholder='Add meg a jelszavad'
                              onChange={handleChange}
                              value={updateData.password}
                              />
                      
                      <input type="password"
                              name='password_confirmation'
                              className='form-control'
                              placeholder='Add meg a jelszavad újra'
                              onChange={handleChange}
                              value={updateData.password_confirmation}
                              />
                      <button className='btn btn-outline-secondary mt-4 reg-btn' type='submit'>Adatmódosítás!</button>
                      </div>
                      </form>
               </div> : 'Loading...'}</> 
          );
}

export default UpdateData;
