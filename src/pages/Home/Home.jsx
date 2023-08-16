import React, { useEffect } from 'react'
import './Home.css'
import { useDispatch, useSelector } from 'react-redux'
import { useResetMessageComponent } from '../../hooks/useResetMessageComponent'
import { getAllPhoto, like } from '../../slices/PhotoSlice'
import { PhotoItem } from '../../components'
import LikeContainer from '../../components/others/LikeContainer'
import { Link, useNavigate } from 'react-router-dom'
import { logout, reset } from '../../slices/AuthSlices'

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const resetMessage = useResetMessageComponent(dispatch)

  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  
  const handleLike = (photo = null) => {
    dispatch(like(photo._id));
    
    resetMessage();
  };
  useEffect(() => {
    dispatch(getAllPhoto());
  }, [dispatch]);
  if (photos.errors) {
    dispatch(logout())
        dispatch(reset())

        navigate("/login")  
  }
  if (loading) {
    return <p>Carregando...</p>;
  }
  return (
     <div id="home">
      {photos &&
        photos.map((photo) => (
          <div key={photo._id}>
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={user} handleLike={handleLike} />
            <Link className="btn" to={`/photos/${photo._id}`}>
              Ver mais
            </Link>
          </div>
        ))}
      {photos && photos.length === 0 && (
        <h2 className="no-photos">
          Ainda não há fotos publicadas,{" "}
          <Link to={`/users/${user._id}`}>clique aqui</Link> para começar.
        </h2>
      )}
    </div>
  )
}

export default Home