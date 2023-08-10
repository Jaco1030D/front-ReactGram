import { useState } from 'react'
import './App.css'
import {Route, Routes, BrowserRouter, Navigate} from 'react-router-dom'
import { EditProfile, Home, Profile, Register, Photo, Search, Login } from './pages'
import { Footer, Navbar } from './components'

function App() {
  const auth = true

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <div className="container">
      <Routes>
        <Route path='/register' element={!auth ? <Register/> : <Navigate to='/'/>} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </div>
      <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
