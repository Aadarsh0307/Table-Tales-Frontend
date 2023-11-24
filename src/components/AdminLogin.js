import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './AdminLogin.css';
import Axios from "axios"

function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const nav = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-in logic here
    console.log('Form data submitted:', formData);

    Axios.post('http://localhost:3000/adminLogin', formData,{
      withCredentials:true
    })
    .then((res)=>{
      if(res.status === 200)
      {
        console.log("Successfully logged in")
        nav('/admin-dashboard');
      
      }
    })
    .catch((err)=>{
      if (err.response && err.response.status === 401) {
        alert("Invalid email or password");
      } else {
        alert("An error occurred. Please try again.");
        console.error(err);
      }
    })
  };

  const inputStyle = {
    marginBottom: '20px',
    position: 'relative',
  };

  const formStyle = {
    background: 'rgba(0, 0, 0, 0.1)',
    padding: '20px',
    borderRadius: '10px',
    transition: 'transform 0.3s',
  };

  const pageStyle = {
    background: `url(${process.env.PUBLIC_URL}/adminbackground.jpg)`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="signin-container">
      <div style={pageStyle}>
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <Link to="/" className="table-tales-link">
                <h1 className="row justify-content-center table-tales-heading">Table Tales</h1>
              </Link>
              <div className="card gradient-background form-container" style={formStyle}>
                <div className="card-body">
                  <h2 className="row justify-content-center text-light">Admin Login</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group" style={inputStyle}>
                      <label htmlFor="email">Email:</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="form-group" style={inputStyle}>
                      <label htmlFor="password">Password:</label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="form-control"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Enter your password"
                          required
                          style={{ width: '100%' }}
                        />
                        <button
                          type="button"
                          className="btn btn-link password-toggle"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                          }}
                        >
                          <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'} eye-icon`} style={{ color: 'black' }}></i>
                        </button>
                      </div>
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn btn-orange">
                        Sign In
                      </button>
                    </div>
                  </form>
                  <p className="mt-3 login-link">
                    Not an admin? <Link to="/restaurant-login">Go back to sign-in</Link>
                  </p>
                  <p className="mt-3 login-link">
                    Want to be an admin? <Link to="/admin-signup">Sign up as admin</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
