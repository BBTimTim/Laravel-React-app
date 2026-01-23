import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, HashRouter } from "react-router-dom";
import Navbar from './components/Navbar';
import Register from './components/account/Register';
import Login from './components/account/Login';
import Updatedata from './components/account/Updatedata';
import Profile from './components/account/Profile';
import Forgetpassword from './components/account/Forgetpassword';
import Resetpassword from './components/account/Resetpassword';

function App() {

  const current_theme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(current_theme ? current_theme : 'light');

  useEffect(() => {
    localStorage.setItem('current_theme', theme);
  }, [theme]);

  return (
   <HashRouter>

    <div className={`wrapper ${theme}`}>
    <div className={`${theme}`}>
      <Navbar theme={theme} setTheme={setTheme} />
    <div className='container'>
    <Routes>
    <Route path='/Register' element={<Register />} />
    <Route path='/Login' element={<Login />} />
    <Route path='/*' element={<>404 not found</>} />
    <Route path='/Profile' element={<Profile />} /> 
    <Route path='/Forgetpassword' element={<Forgetpassword />} />
     <Route path='/Forgetpassword' element={<Resetpassword />} />
    <Route path='/Updatedata' element={<Updatedata />} />
    </Routes>

    </div>
</div>
</div>
</HashRouter>
    )
}

export default App
