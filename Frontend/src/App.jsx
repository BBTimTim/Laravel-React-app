import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import UpdateData from './components/UpdateData';
import Profile from './components/Profile';
/* import ForgotPassword from './components/forgotPassword'; */

function App() {

  const current_theme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(current_theme ? current_theme : 'light');

  useEffect(() => {
    localStorage.setItem('current_theme', theme);
  }, [theme]);

  return (
   <Router>
    <div className={`wrapper ${theme}`}>
    <div className={`${theme}`}>
      <Navbar theme={theme} setTheme={setTheme} />
    <div className='container'>
    <Routes>
    <Route path='/Register' element={<Register />} />
    <Route path='/Login' element={<Login />} />
    <Route path='/*' element={<>404 not found</>} />
    <Route path='/Profile' element={<Profile />} /> 
  {/*   <Route path='/ForgotPassword' element={<ForgotPassword />} />  */}
    <Route path='/UpdateData' element={<UpdateData />} />
    </Routes>

    </div>
</div>
</div>
</Router>
     )
}

export default App
