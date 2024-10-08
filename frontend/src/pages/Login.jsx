// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import background from "../assets/singUpbg.jpg"
import Navbar from '../Components/Navbar';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', { username, password });
      if (response.status === 201) {
        
        localStorage.setItem('token', response.data.token); 
        toast.success('Login successful!');
        
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      toast.error('Login failed! Please check your credentials.');
      console.error('There was an error logging in:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className='flex min-h-screen w-screen items-center justify-center '
      style={{
        backgroundImage: `url(${background})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
        <div className='flex flex-col w-full md:w-1/3 h-1/2 gap-4 items-center justify-center bg-black bg-opacity-85 rounded-lg p-10'>
          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
              <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            onClick={handleLogin}
            className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-black text-white border-none mt-3">
            Log In
          </button>
          <h2 className='font-extrabold text-white'>
            Don't Have an Account?{' '}
            <a className="text-red-500" href="/signup">
              SignUp
            </a>
          </h2>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
