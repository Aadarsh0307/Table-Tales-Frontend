import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from "axios"

function Navbar() {

  const [user, setUser] = useState();
  const [isloggedin, setIsLoggedIn] = useState(false)

  const handleLogin = (us) =>{
    setUser(us)
  }

  useEffect(() =>{

    Axios.post('http://localhost:3000/user', {data:1}, {
      withCredentials:true
    })
    .then((res) =>{
      console.log(res)
        if(res.status != 401)
        {
          setIsLoggedIn(true)
        }
        
    })
    .catch(err => console.log(err))
  }, [isloggedin])
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-red" style={{ paddingLeft: '20px' }}>
      <NavLink className="navbar-brand text-white" to="/"><span style={{ fontWeight: 'bold' }}>Table Tales</span></NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            {isloggedin&& <NavLink className="nav-link text-white" to="/book-table" activeClassName="active" style={{ fontWeight: 'bold' }}>Book Table</NavLink>}
          </li>
        </ul>
      </div>
      <div className="navbar-nav ml-auto">
        {!isloggedin && <NavLink className="nav-link text-white" to="/restaurant-login" activeClassName="active" style={{ fontWeight: 'bold' }}>Signin</NavLink>}
        {!isloggedin && <NavLink className="nav-link text-white" to="/signup" activeClassName="active" style={{ fontWeight: 'bold' }}>Signup</NavLink>}
        {isloggedin && <NavLink className="nav-link text-white" to="/profile" activeClassName="active" style={{ fontWeight: 'bold' }}>Profile</NavLink>}
      </div>
    </nav>
  );
}

export default Navbar;