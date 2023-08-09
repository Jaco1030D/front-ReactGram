import React, { useState } from 'react'
import './Navbar.css'
import {BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill} from 'react-icons/bs'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useDispatch, useSelector } from 'react-redux'
import { logout, reset } from '../../slices/AuthSlices'
const Navbar = () => {
    const {auth} = useAuth()
    const {user} = useSelector((state) => state.auth)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [query, setQuery] = useState()
    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())

        navigate("/login")
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        if (query) {
            return navigate(`/search?q=${query}`)
        }
    }


  return (
    <nav id='nav'>
        <Link to='/'>
            <h2>ReactGram</h2>
        </Link>
        <form id='search-form' onSubmit={handleSubmit}>
            <BsSearch/>
            <input type="text" placeholder='pesquisar' onChange={(e) => {setQuery(e.target.value)}}/>
        </form>
        <ul id='nav-links'>
            {auth ?
            (
                <>
                <li>
                <NavLink to="/">
                    <BsHouseDoorFill />
                </NavLink>
                </li>
                {user && (
                    <li>
                        <NavLink to={`/users/${user._id}`}>
                            <BsFillCameraFill />
                        </NavLink>
                    </li>
                )}
                <li>
                    <NavLink to="/profile">
                        <BsFillPersonFill />
                    </NavLink>
                </li>
                <li>
                    <span onClick={handleLogout}>Sair</span>
                </li>
                </>
                
            )
            :
            (
                <>
                <li>
                <NavLink to="/register">
                    Cadastrar
                </NavLink>
                </li>
                <li>
                <NavLink to="/login">
                    Login
                </NavLink>
                </li>
                </>
            )
            }
        </ul>
    </nav>
  )
}

export default Navbar