import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import config from '../Config';

const { api_url } = config;

const Profile = () => {
    const [user, setUser] = useState(null);
//azért kell useeffect, mert a React komponens betöltődése után kell lefuttatni
  const navigate = useNavigate();

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
    
    return (
        <div className="container col-md-8">
        { user !== null ?  <div className="row gy-3 b-flex justify-content-center">
       <h2 className="text-center mt-5">Üdvözöllek az oldalon {user.name}!</h2>  
        <Link className='text-center' to="/updatedata">Adataim módosítása</Link>
      </div> : 'Loading...'}
    </div>
    );
} 

export default Profile;


