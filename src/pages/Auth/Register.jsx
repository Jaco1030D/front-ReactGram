import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import './Auth.css'
import {register, reset} from "../../slices/AuthSlices"

import {useSelector, useDispatch} from 'react-redux'
import { Message } from '../../components'

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassWord, setConfirmPassWord] = useState("")

  const dispatch = useDispatch()

  const {loading, error} = useSelector((state) => state.auth)

  const handleSubmit = (e) =>{
    e.preventDefault()
    const user ={
      name,
      email,
      password,
      confirmPassWord
    }

    dispatch(register(user))
  }

  useEffect(() => {
    dispatch(reset())
  },[dispatch])
  return (
    <div id='register'>
      <h2>Cadastrar-se</h2>
      
      <form onSubmit={handleSubmit} >
        <input type="text" placeholder='Digite seu nome...' value={name || ''} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder='Digite seu E-mail...' value={email || ''} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder='Digite a senha...' value={password || ''} onChange={(e) => setPassword(e.target.value)}/>
        <input type="password" placeholder='Digite a senha novamente...' value={confirmPassWord || ''} onChange={(e) => setConfirmPassWord(e.target.value)}/>
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {!loading && <input type="submit" value="cadastrar"  />}
        {error && <Message msg={error} type="error" />}
      </form>
      <p>
        Ja tem uma conta? <Link to="/login">Clique aqui</Link>
      </p>
    </div>
  )
}

export default Register