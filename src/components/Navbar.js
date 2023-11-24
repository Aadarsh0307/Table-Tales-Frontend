import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from "axios"

function Navigationbar() {
  const nav = useNavigate();
  const [user, setUser] = useState();
  const [isloggedin, setIsLoggedIn] = useState(false)
  const [isadmin, setIsAdmin] = useState(false)

  const handleLogout = async() => {
    const isConfirmed = window.confirm('Are you sure you want to log out?');

    if (isConfirmed) {
      alert('Logging out...');
      await Axios.post("https://table-tales-backend.onrender.com/logout", { data: 1 }, {
        withCredentials: true
      })
        .then((res) => {
          if (res.status === 200) {
            nav('/');
            window.location.reload(true);
            setIsLoggedIn(false);setIsAdmin(false)
          }
        })
    }
  };
  useEffect(() => {

    Axios.post('https://table-tales-backend.onrender.com/user', { data: 1 }, {
      withCredentials: true
    })
      .then((res) => {
        console.log(res)
        if (res.status != 401) {
          setIsLoggedIn(true)
        }
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    Axios.post('https://table-tales-backend.onrender.com/admin', { data: 1 }, {
      withCredentials: true
    })
      .then((res) => {

        if (res.status != 402) {
          setIsAdmin(true)
        }

      })
      .catch(err => console.log(err))

  }, [])

  return (

    <Navbar className='navbar' expand="lg">
      <Navbar.Brand as={NavLink} to="/">Table Tales</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {isloggedin && <Nav.Link as={NavLink} to="/book-table">Book Table</Nav.Link>}
        </Nav>
        <Nav className="ml-auto">
          {!(isloggedin || isadmin )&& <Nav.Link as={NavLink} to="/restaurant-login">Signin</Nav.Link>}
          {!(isloggedin || isadmin ) && <Nav.Link as={NavLink} to="/signup">Signup</Nav.Link>}
          {isloggedin && <NavDropdown title="Account" id="basic-nav-dropdown">
            <NavDropdown.Item as={NavLink} to="/profile">View Profile</NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
          </NavDropdown>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigationbar;
