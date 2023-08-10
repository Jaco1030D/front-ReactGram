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
      <Login />
      </div>
      <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
