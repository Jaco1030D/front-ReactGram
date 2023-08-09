import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '../../hooks/useQuery'
import './Search.css'
import { useResetMessageComponent } from '../../hooks/useResetMessageComponent'
import { useEffect } from 'react'
import { SearchPhoto, like } from '../../slices/PhotoSlice'
import { PhotoItem } from '../../components'
import LikeContainer from '../../components/others/LikeContainer'
import { Link } from 'react-router-dom'

const Search = () => {
  const query = useQuery()
  const search = query.get("q")

  const dispatch = useDispatch()

  const resetMessage = useResetMessageComponent(dispatch)

  const {user} = useSelector((state) => state.auth)
  const { photos, loading } = useSelector((state) => state.photo)

  useEffect(() => {
    dispatch(SearchPhoto(search))
  }, [dispatch, search])

  const handleLike = (photo = null) => {
    dispatch(like(photo._id))

    resetMessage()
  }

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="search">
      <h2>Você está buscando por: {search}</h2>
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
    </div>
  )
}

export default Search