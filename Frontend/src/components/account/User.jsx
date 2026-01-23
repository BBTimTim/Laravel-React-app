import React, { useEffect, useState } from 'react';
import config from '../../config';

const { api_url } = config;
/* const Users = () => {
    const [usersList, SetUsersList] = useState([])

    useEffect(() => {
        fetch('/api/users')
        .then(res => res.json())
        .then(res => SetUsersList(res))
    }, [])
 */
    const User = () => {
        const [usersList, SetUsersList] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
    
        useEffect(() => {
          fetch(`${api_url}/user`)
            .then(res => {
                if(!res.ok) {
                    throw new Error('Hálózati hiba');
                }
                    return res.json();
             })
             .then(usersList => {
                SetUsersList(usersList);
                setLoading(false);
              })
              .catch(error => {
                setError(error);
                setLoading(false);
              });
        }, [])
    
        if (loading) return <div className='loading'>Loading...</div>;
        if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='container'>
           <h1 className='mt-5 text-center'>Felhasználók listája:</h1>
           <div  className='row g-3 align-items-center col-sm-6 mx-auto p-2'>
               {usersList.length > 0 && usersList.map(user => 
               <li key={user.id}>{user.name} - {user.email}</li>)}
          </div>
        </div>
    );
}

export default User;
