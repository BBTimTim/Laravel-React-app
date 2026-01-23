import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import config from '../../config';

const { api_url } = config;

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if(!token) {
      navigate('/login');
      return;
    }
      fetch(`${api_url}/user`, {
            headers: {
               'Authorization':`Bearer ${token}`,
                'Accept': 'application/json'
            }
          }).then(res => {
               if(!res.ok) {
                navigate('/login')
          } 
          return res.json()
        }  )
        .then(data => {
          setUser( data )
        } )
        }, [navigate])
    
    return (
        <div className="container col-md-8">
        { user !== null ?  <div className="row gy-3 b-flex justify-content-center">
       <h2 className="text-center mt-5">Üdvözöllek az oldalon {user.name}!</h2>  
        <Link className='text-center' to="/updatedata">Adataim módosítása</Link>
      </div> : <p className='loading'>Loading...</p>}
    </div>
    );
} 

export default Profile;


