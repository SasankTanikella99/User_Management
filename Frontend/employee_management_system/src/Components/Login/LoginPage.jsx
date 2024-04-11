import React, { useState } from 'react';
import './LoginPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [values, setValues] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState()
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5300/auth/adminlogin', values)
      .then(result => {
        if(result.data.loginStatus){
          // protected Route
          localStorage.setItem("valid", true)
          navigate('/dashboard')
        }else{
          setError(result.data.error)
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='login-container d-flex justify-content-center align-items-center vh-100'>
      <div className='form-container p-3 rounded w-25 border'>
       
        <form onSubmit={handleSubmit}>
          <h2> Login </h2>
          <div className='email mb-3'>
            <label htmlFor='email'>Email: </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder='enter your email'
              required
              className='form-control rounded-0'
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className='password mb-3'>
            <label htmlFor='password'>Password: </label>
            <input
              type="password" 
              name="password"
              id="password"
              placeholder='enter your Password'
              required
              className='form-control rounded-0'
              onChange={(e) => setValues({ ...values, password: e.target.value })}
            />
          </div>
          <div className='button mb-1'>
            <button className='btn btn-success w-100 rounded-0' type="submit">Log in</button>
          </div>
          <div className='checkbox mb-3 '>
            <input type="checkbox" name="tick" id="tick" />
            <label className='label' htmlFor='check'>Agree with terms and conditions</label>
          </div>
        </form>
        <div className='text-warning'>
          {error && error }
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
