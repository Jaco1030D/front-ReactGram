import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { Message } from '../../components'
// import { login, reset } from '../../slices/AuthSlices'
import './Auth.css'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // const dispatch = useDispatch()

  // const {loading, error} = useSelector((state) => state.auth)

  const handleSubmit = (e) =>{
    e.preventDefault()
    const user ={
      email,
      password,
    }
    console.log(user)

  //   dispatch(login(user))
  }
  // useEffect(() => {
  //   dispatch(reset())
  // },[dispatch])
  return (
    <div id='register'>
      <h2>Entrar</h2>
      <form onSubmit={handleSubmit} >
        <input type="email" placeholder='Digite seu E-mail...' value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder='Digite a senha...' value={password} onChange={(e) => setPassword(e.target.value)}/>
        {/* {loading && <input type="submit" value="Aguarde..." disabled />} */}
        <input type="submit" value="Entrar"  />
        {error && <Message msg={error} type="error" />}
      </form>
      <p>
       Não tem conta ainda? <Link to="/register">Clique aqui</Link>
      </p>
    </div>
  )
}

export default Login;