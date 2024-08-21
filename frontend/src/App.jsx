import { useState } from 'react'
import Homepage from './pages/Homepage'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import axios from 'axios'
import Store from './pages/Store'
import Sell from './pages/Sell'
import Favorites from './pages/Favorites'



function App() {
  axios.defaults.withCredentials = true;

  return (
    <>
    <Routes>
     <Route path='/' element={<Homepage />} />  
     <Route path='/login' element={<Login />} />
     <Route path='/signup' element={<Signup />} />
     <Route path="/profile" element={<Profile />} />
     <Route path='/store' element={<Store />} />
     <Route path='/sell' element={<Sell />} />
     <Route path="/favorites" element={<Favorites />} />
    </Routes>
    
    </>
  )
}

export default App
