import { useState } from 'react'
import './App.css'
import {Route, Routes, BrowserRouter, Navigate} from 'react-router-dom'
import { EditProfile, Home, Profile, Register, Photo, Search, Login } from './pages'
import { Footer, Navbar } from './components'

function App() {
  const auth = true

  return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <div className="container">
          <Routes>
            <Route path='/register' element={!auth ? <Register/> : <Navigate to='/'/>} />
            <Route path="/login" element={<Login />} />
          </Routes>
          </div>
          <Footer/>
        </div>
      </BrowserRouter>
  )
}

export default App
