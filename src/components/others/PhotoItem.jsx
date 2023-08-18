import React from 'react'
import { Link } from 'react-router-dom'
import './PhotoItem.css'
const PhotoItem = ({photo}) => {
  return (
    <div className='photo-item'>
        {photo.image && (
            <img src={`${photo.image}`} alt={photo.title} />
        )}
        <h2>{photo.title}</h2>
        <p className="photo-author">
            Publicado por: {" "}
            <Link to={`/users/${photo.userId}`} >{photo.userName}</Link>
        </p>
    </div>
  )
}

export default PhotoItem