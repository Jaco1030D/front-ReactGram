import './Profile.css'

import { uploads } from '../../utils/configure'
import  {Message, MessageContainer}  from '../../components'
import { Link, useParams } from 'react-router-dom'
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getuserDetails } from '../../slices/UserSlices'
import { publishPhoto, resetMessage, getUserPhotos, deletePhoto, updatePhoto } from '../../slices/PhotoSlice'


const Profile = () => {
    const {id} = useParams()
    
    const dispatch = useDispatch()

    const {user, loading} = useSelector((state) => state.user)
    const {user: userAuth} = useSelector((state) => state.auth)
    const {
        photos,
        loading:loadingPhoto,
        message:messagePhoto,
        error:errorPhoto
    } = useSelector((state) => state.photo)

    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [editId, setEditId] = useState("")
    const [editTitle, setEditTitle] = useState("")
    const [editImage, setEditImage] = useState("")
    const [disa, setdisa] = useState(false)

    const handleFile = (e) =>{
        const img = e.target.files[0]
        setImage(img)
      }
    
    const newPhotoForm = useRef()
    const editPhotoForm = useRef()

    function resetComponentMessage() {
        setTimeout(() => {
          dispatch(resetMessage());
          
        }, 2000);
    }

    useEffect(() => {
        dispatch(getuserDetails(id))
        dispatch(getUserPhotos(id))
    },[dispatch, id])

    const handleSubmit = (e) => {
        e.preventDefault()

        const photoData ={
            title,
            image
        }

        const formData = new FormData()

        const photoFormData = Object.keys(photoData).forEach((key) => {
            formData.append(key, photoData[key])
        })

        formData.append("photo", photoFormData)

        dispatch(publishPhoto(formData))

        setTitle("")
        setImage("")
        resetComponentMessage()
    }

    const handleDelete = (id) =>{
        dispatch(deletePhoto(id))
        resetComponentMessage()
    }
    const hideOrShowForms = () =>{
        newPhotoForm.current.classList.toggle("hide")
        setdisa(!disa)
        editPhotoForm.current.classList.toggle("hide")
    }
    const handleEdit = (photo) => {
        if (editPhotoForm.current.classList.contains("hide")) {
            hideOrShowForms()
        }

        setEditId(photo._id)
        setEditImage(photo.image)
        setEditTitle(photo.title)
    }

    const handleUpdate = (e) =>{
        e.preventDefault()

        const photoData ={
            title: editTitle,
            id: editId
        }

        dispatch(updatePhoto(photoData))

        resetComponentMessage()
    }
    const handleCancelEdit = () =>{
        hideOrShowForms()
    }
    
    if (loading) {
        return <p>Carregando...</p>
    }
  return (
    <div id='profile'>
        <div className="profile-header">
            {user.profileImage && (
                <img src={`${uploads}/user/${user.profileImage}`} alt={user.name} />
            )}
            <div className="profile-description">
                <h2>{user.name}</h2>
                <p>{user.bio}</p>
            </div>
        </div>
        {id === userAuth._id && (
            <>
            <div className="new-photo" ref={newPhotoForm}>
                <h3>Compartilhe algum momento seu:</h3>
                <form onSubmit={handleSubmit}>
                    <label>
                        <span>Titulo da foto</span>
                        <input type="text" placeholder='insira um titulo'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title} />
                    </label>
                    <label>
                        <span>Imagem:</span>
                        <input type="file" onChange={handleFile} />
                    </label>
                    {!loadingPhoto && <button>Postar</button>}
                    {loadingPhoto && (
                        <button disabled >Aguarde</button>
                        // <input type="Submit" disabled value='Aguarde...' />
                    )}
                </form>
            </div>
            <div className="edit-photo hide" ref={editPhotoForm}>
                <p>Editando</p>
                {editImage && (
                    <img src={`${uploads}/photos/${editImage}`} alt={editTitle} />
                )}
                <form onSubmit={handleUpdate}>
                 
                    <span>Titulo da foto</span>
                    <input type="text" placeholder='insira um titulo'
                    onChange={(e) => setEditTitle(e.target.value)}
                    value={editTitle} />
                
                    {/* <input type="Submit" value='Atualizar' /> */}
                    <button>Atualizar</button>
                    <br />
                    <button className='cancel-btn' onClick={handleCancelEdit} >
                        cancelar edição
                    </button>
                </form>
            </div>

            <MessageContainer error={errorPhoto} message={messagePhoto} /> 
            </>
        )}
        <div className="user-photos">
            <h2>Fotos Publicada:</h2>
            <div className="photos-container">
                {photos && photos.map((photo) => (
                    <div className="photo" key={photo._id} >
                        {photo.image && (<img src={`${uploads}/photos/${photo.image}`} alt={photo.title} />)}
                        {id === userAuth._id ? (
                            <div className="actions">
                                <Link to={`/photos/${photo._id}`} ><BsFillEyeFill/></Link>
                                <BsPencilFill onClick={() => handleEdit(photo)}/>
                                <BsXLg onClick={() => handleDelete(photo._id)}/>
                            </div>
                        ) : (
                            <Link to={`/photos/${photos._id}`}>
                            ver
                            </Link>
                        )}
                    </div>
                ))}
                {photos.length === 0 && <p>Ainda não possui fotos</p>}
            </div>
        </div>
    </div>
  )
}

export default Profile