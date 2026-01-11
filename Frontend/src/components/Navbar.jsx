import React from 'react';
import { Link } from "react-router-dom";
import logo_light from '../assets/order-d.png'
import logo_dark from '../assets/order.png'
import toggle_dark from '../assets/day.png'
import toggle_light from '../assets/night.png'
import search_icon_dark from '../assets/search-b.png'
import search_icon_light from '../assets/search-w.png'
import { useNavigate } from 'react-router-dom';

const Navbar = ({ theme, setTheme }) => {

const navigate = useNavigate();

    const logoutBtn = (e) => {
    e.preventDefault()
    const logoutResult = confirm('Biztosan kijelentkezel?')
    if(!logoutResult) {
      return;
    }
      fetch('http://codiva.fejlessz.hu/api/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer `+localStorage.getItem('token'),
            },
        })
        .then(res => {
          if(res.ok){
          localStorage.removeItem('token')
          navigate('/login');
          }else{
            alert('Ismeretlen hiba keletkezett!');
          }
       })
         
}

    const toggle_mode = () => {
        theme =='light' ? setTheme('dark') : setTheme('light');
     }

    return (
  <nav className={`navbar no-gutters shadow navbar-expand-lg ${theme}`}>
  <div className="container">
    <Link className="navbar-brand"><img src={ theme == 'light' ? logo_light : logo_dark } alt="logo" className='logo'/></Link>
    <div className="d-flex flex-column">
          <h5 className="mb-1 title-1">All Day</h5>
          <p className="mb-1 title-2"><b>Delivery</b></p>
        </div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-lg-0 mx-5">
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="#">Kezdőlap</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Regisztráció</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Belépés</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profile">Profilom</Link>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Egyéb
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to=""></Link></li>
            <li><Link className="dropdown-item" to="/updatedata">Adatmódosítás</Link></li>
            <li><Link className="dropdown-item" to="#">Something else here</Link></li>
          </ul>
        </li>
        <li className="nav-item logout">
          <Link className="nav-link logout" onClick={logoutBtn}>Kilépés</Link>
        </li>
      </ul>
      <div className="search-box" role="search">
        <input className=" me-2" type="search" placeholder="Search"/>
        <img src={theme == 'light' ? search_icon_light : search_icon_dark } alt="icon" />
        </div>
        <img onClick={()=>{ toggle_mode() }} src={theme == 'light' ? toggle_light : toggle_dark } alt="icon" className='toggle-icon'/>
      </div>
    </div>

    
</nav>
    );
}


export default Navbar;
