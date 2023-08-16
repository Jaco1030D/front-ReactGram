import { boodyRequestPhotoService } from "../utils/bodyRequest";
const publishPhoto = async (data, token) => {
  return boodyRequestPhotoService("POST", data, token, true)
}

const getUserPhoto = async (id, token) => {
  return boodyRequestPhotoService("GET", null, token, false, id, 'users/')
};

const deletePhoto = async (id, token) => {
  return boodyRequestPhotoService("DELETE", null, token, false, id)
}

const updatePhoto = async (id, token, data) => {
  return boodyRequestPhotoService("PUT", data, token, false, id)
}

const getPhotoById = async (id, token) => {
  return boodyRequestPhotoService("GET", null, token, false, id)
}

const like = async (id, token) => {
  return boodyRequestPhotoService("PUT", null, token, false, id, 'like/')
}

const comment = async(id, token, data) => {
  return boodyRequestPhotoService("PUT", data, token, false, id, 'comment/')
}
const getAllPhotos = async (token) =>{
  return boodyRequestPhotoService("GET", null, token, false)
}
const searchPhoto = async (query, token) => {
  return boodyRequestPhotoService("GET", null, token, false, query, 'search?q=')
}

const photoService = {
    publishPhoto,
    getUserPhoto,
    deletePhoto,
    updatePhoto,
    getPhotoById,
    like,
    comment,
    getAllPhotos,
    searchPhoto
}

export default photoService