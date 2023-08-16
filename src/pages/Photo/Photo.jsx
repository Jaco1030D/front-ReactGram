import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPhotoById, like, comment } from '../../slices/PhotoSlice'
import { useDispatch, useSelector } from 'react-redux'
import { MessageContainer, PhotoComment, PhotoItem } from '../../components'
import './Photo.css'
import LikeContainer from '../../components/others/LikeContainer'
import { useResetMessageComponent } from '../../hooks/useResetMessageComponent'
const Photo = () => {
    const {id} = useParams()
    
    const {user} = useSelector((state) => state.auth)
    const {
        photo,
        loading,
        message,
        error
    } = useSelector((state) => state.photo)

    const [commentText, setCommentText] = useState("")

    const dispatch = useDispatch()

    const resetMessage = useResetMessageComponent(dispatch)

    useEffect(() => {
      dispatch(getPhotoById(id))
    },[dispatch, id])
    
    const handleLike = () => {
      dispatch(like(photo._id))

      resetMessage()
    }

    const handleComment = (e) => {
      e.preventDefault()

      const photoData = {
        comment: commentText,
        id: photo._id
      }

      dispatch(comment(photoData))

      setCommentText("")

      resetMessage()
    }

    if (loading) {
      return <p>Carregando...</p>
    }
    
  return (
    <div id='photo'>
        <PhotoItem photo={photo} />
        <LikeContainer photo={photo} user={user} handleLike={handleLike} />
        <MessageContainer error={error} message={message} />
        <div className="comments">
          {photo.comments && (
            <>
              <h3>Comentarios ({photo.comments.length}):</h3>
              <form onSubmit={handleComment}>
                <input
                type='text'
                placeholder='Digite o que achou...'
                onChange={(e) => setCommentText(e.target.value)}
                value={commentText}
                />
                <input type="submit" value="enviar" />
              </form>
              <PhotoComment comments={photo.comments} />
            </>
          )}
        </div>
    </div>
  )
}

export default Photo