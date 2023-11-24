import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import Axios from 'axios';
import './RestaurantLogin.css';
import { useNavigate } from 'react-router-dom';

function RestaurantLogin() {

  const nav = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-in logic here
    

    Axios.post('https://table-tales-backend.onrender.com/login', formData,{
      withCredentials:true
    })
    .then((res) =>{

      console.log(res)
      
      if(res.status === 200)
      {
        console.log("Successfull Logged In");
        console.log(res)
        nav('/book-table');
        window.location.reload(true)
      }

      else {
        console.log(res);
        if (res.data.message) {
          alert(res.data.message); // Display the error message from the server
        } else {
          alert("Invalid email or password"); // Fallback message
        }
      }
      
    })
    .catch((err) =>{
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
    background: `url(${process.env.PUBLIC_URL}/restaurant-img.jpg)`,
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
                  <h2 className="row justify-content-center text-light">Sign In to Your Account</h2>
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
                    Don't have an account?{' '}
                    <Link to="/signup">Sign Up</Link>
                  </p>
                  <p className="mt-3 login-link">
                    Admin Login?{' '}
                    <Link to="/admin-login">Click here</Link>
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

export default RestaurantLogin;
