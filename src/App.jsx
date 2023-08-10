import { useState } from 'react'
import './App.css'
import {Route, Routes, BrowserRouter, Navigate} from 'react-router-dom'
import { EditProfile, Home, Profile, Register, Photo, Search, Login } from './pages'
import { Footer, Navbar } from './components'
import { useAuth } from './hooks/useAuth'

function App() {
  const {loading, auth } = useAuth()

  if (loading) {
    return <div>loading...</div>
  }
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <div className="container">
      <Routes>
        <Route path='/' element={auth ? <Home/> : <Navigate to='/login'/>} />
        <Route path='/profile' element={auth ? <EditProfile/> : <Navigate to='/login'/>} />
        <Route path='/users/:id' element={auth ? <Profile/> : <Navigate to='/login'/>} />
        <Route path='/register' element={!auth ? <Register/> : <Navigate to='/'/>} />
        <Route path='/login' element={!auth ? <Login/> : <Navigate to='/'/>} />
        <Route path='/search' element={auth ? <Search/> : <Navigate to='/login'/>} />
        <Route path='/photos/:id' element={auth ? <Photo/> : <Navigate to='/login'/>} />
      </Routes>
      </div>
      <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
