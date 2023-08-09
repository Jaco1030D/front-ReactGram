import React from 'react'
import './PhotoComment.css'
import { Link } from 'react-router-dom'
import { uploads } from '../../utils/configure'
const PhotoComment = ({comments}) => {
  return (
    <div>
        {comments.length === 0 && <p>Não há comentários...</p>}
        {comments.map((comment) => (
            <div className="comment" key={comment.comment}>
                <div className="author">
                {comment.userImage && (
                    <img src={`${uploads}/user/${comment.userImage}`} alt={comment.userName} />
                )}
                <Link to={`/users/${comment.userId}`}> <p>{comment.userName}</p> </Link>
                </div>
                <p>{comment.comment}</p>
            </div>
        ))}
    </div>
  )
}

export default PhotoComment