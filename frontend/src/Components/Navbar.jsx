// Navbar.jsx
import React, { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdAccountCircle } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaHeart } from "react-icons/fa";
import { FaStore } from "react-icons/fa";
import { IoPower } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    
    const token = localStorage.getItem('token'); 
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {

    localStorage.removeItem('token'); 
    setIsLoggedIn(false); 
    toast.success('Logged out successfully!');
    navigate('/login'); 
  };

  const handleSell = () => {
    if (isLoggedIn) {
      navigate('/sell'); // Navigate to the Sell page if the user is logged in
    } else {
      toast.error('Please log in to sell items.');
      navigate('/login'); // Redirect to the login page if the user is not logged in
    }
  };

  return (
    <div className="navbar fixed top-0 left-0 z-50 bg-black">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <GiHamburgerMenu size={25} />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><a href='/'>Home</a></li>
            {!isLoggedIn && <li><a href='/login'>Login</a></li>}
            {!isLoggedIn && <li><a href='/signup'>Sign Up</a></li>}
            {isLoggedIn && <li><a href='/profile'>Profile</a></li>}
            {isLoggedIn && <li> <a href='favorites'>Fav</a></li>}
            {isLoggedIn && <li> <a href='store'>Strore</a></li>}
            {isLoggedIn && <li><a onClick={handleLogout} role="button">Logout</a></li>}
           
          </ul>
        </div>
        <h1 className='text-3xl font-extrabold ml-5 text-white' onClick={()=>{
          navigate('/')
        }}>OLX</h1>
        
      </div>
      <div className="navbar-center flex md:hidden">
      <button className="ml-20 h-10 w-20 rounded-2xl border-4 border-white font-bold text-white bg-gradient-to-r from-slate-400 to-black" onClick={handleSell}>Sell</button>
      </div>
      <div className="navbar-end hidden lg:flex lg:mr-5">
        <ul className="menu menu-horizontal px-1">
          <li className='text-white font-semibold'><a href='/'>Home</a></li>
          {!isLoggedIn && <li className='text-white font-semibold'><a href='/signup'>Sign Up</a></li>}
          {isLoggedIn && <li> <a href='favorites'><FaHeart size={25} color='red'/></a></li>}
          {isLoggedIn && <li> <a href='store'><FaStore size={25} color='white'/></a></li>}
          <li>
        <details>
          <summary><MdAccountCircle size={25} color='white'/></summary>
          <ul className="p-2 mr-3">
            {!isLoggedIn && <li><a href='/login'>Login</a></li>}
            {!isLoggedIn && <li><a href='/signup'>Signup</a></li>}
            <li> {isLoggedIn && <li><button onClick={handleLogout} className=" bg-black text-white">Logout <IoPower size={20}/></button></li>}</li>
            <li>{isLoggedIn && <li><button onClick={()=>{navigate("/profile")}} className=" bg-black text-white">Profile <MdManageAccounts size={20}/></button></li>}</li>
          </ul>
        </details>
      </li>
        </ul>
        <button className="ml-5 h-10 w-20 rounded-2xl border-4 border-white font-bold text-white bg-gradient-to-r from-slate-400 to-black" onClick={handleSell}>Sell</button>
      </div>
     
    </div>
  );
}

export default Navbar;
