import React, { useEffect, useState } from 'react'
import './EditProfile.css'

import {useSelector, useDispatch} from 'react-redux'
import { profile, resetMenssage, updateProfile } from '../../slices/UserSlices'
import { Message } from '../../components'

const EditProfile = () => {
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [email, setEmail] = useState("")
  const [previewImg, setPreviewImg] = useState("")
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const dispatch =  useDispatch()
  
  const {user, message, error, loading} = useSelector((state) => state.user)

  useEffect(() =>{
    dispatch(profile())
  },[dispatch])
  useEffect(() =>{
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setBio(user.bio)
    }
  },[user])
  const handleFile = (e) =>{
    const img = e.target.files[0]
    setPreviewImg(img)
    const lerArquivo = new FileReader()

    lerArquivo.onload = function (arquivo) {

      setProfileImage(arquivo.target.result)

    }

    lerArquivo.readAsDataURL(img)
  }
  const handleSubmit = async (e) =>{
    e.preventDefault()
    const userData = {
      name,
    }
    if (profileImage) {
      userData.profileImage = profileImage
    }
    if (bio) {
      userData.bio = bio
    }
    if (password) {
      userData.password = password
    }

    await dispatch(updateProfile(userData))

    setTimeout(() => {
      dispatch(resetMenssage());
    }, 2000);
  }
  return (
    <div id='edit-profile'>
      <h2>Atualizar o seu perfil</h2>
      <p>Adicione uma imagem de perfil e conte mais sobre você</p>
      {(user.profileImage ||previewImg) && (<img className='profile-image'
      src={previewImg ? URL.createObjectURL(previewImg) : user.profileImage} alt='img'
      />)}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Digite seu nome...' value={name || ''} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder='Digite seu E-mail...' value={email || ''} onChange={(e) => setEmail(e.target.value)} disabled />
        <label>
          <span>Imagem de perfil:</span>
          <input type="file" onChange={handleFile} />
        </label>
        <label>
          <span>Bio:</span>
          <input type="text" placeholder='descrição' value={bio || ''} onChange={(e) => setBio(e.target.value)} />
        </label>
        <label>
          <span>Quer alterar sua senha</span>
          <input type="password" placeholder='digite sua nova senha' value={password || ''} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {!loading && <input type="submit" value="Atualiza"  />}
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </form>
    </div>
  )
}

export default EditProfile