import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import photoService from "../services/PhotoServices";
import { bodyRequestPhoto } from "../utils/bodyRequest";

const initialState = {
    photos: [],
    photo: [],
    error: false,
    sucess: false,
    loading: false,
    message: null
}


export const publishPhoto = createAsyncThunk(
    "photo/publish",
    async (photo, thunkAPI) => {
        return bodyRequestPhoto(thunkAPI, photo, photoService.publishPhoto)
    }
)

export const getUserPhotos = createAsyncThunk(
    "photo/userphotos",
    async (id, thunkAPI) => {
        return bodyRequestPhoto(thunkAPI, id, photoService.getUserPhoto)
    }
);

export const deletePhoto = createAsyncThunk(
    "photo/delete",
    async (id, thunkAPI) => {
        return bodyRequestPhoto(thunkAPI, id, photoService.deletePhoto)
    }
)

export const updatePhoto = createAsyncThunk(
    "photo/update",
    async(photo, thunkAPI) => {
        return bodyRequestPhoto(thunkAPI, photo.id, photoService.updatePhoto, {title: photo.title})
    }
)

export const getPhotoById = createAsyncThunk(
    "photo/getPhotoById",
    async(id, thunkAPI) => {
        return bodyRequestPhoto(thunkAPI, id, photoService.getPhotoById)
    }
)

export const like = createAsyncThunk(
    "photo/like",
    async(id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
    
        const data = await photoService.like(id, token);

        if (data.errors) {
            return thunkAPI.rejectWithValue(data);
        }

        return data;
    }
)

export const comment = createAsyncThunk(
    "photo/comment",
    async(photoData, thunkAPI) => {
        return bodyRequestPhoto(thunkAPI, photoData.id, photoService.comment, {comment: photoData.comment})
    }
)

export const getAllPhoto = createAsyncThunk(
    "photo/getAllPhoto",
    async(_, thunkAPI) =>{
        const token = thunkAPI.getState().auth.user.token;
        const data = await photoService.getAllPhotos(token)
        
        return data
    }
)
export const SearchPhoto = createAsyncThunk(
    "photo/searchPhoto",
    async(query, thunkAPI) =>{
        return bodyRequestPhoto(thunkAPI, query, photoService.searchPhoto)
    }
)

export const photoSlice = createSlice({
    name: 'photo',
    initialState,
    reducers : {
        resetMessage: (state) =>{
            state.message = null
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(publishPhoto.pending , (state) => {
            state.loading = true
            state.error = false
        })
        .addCase(publishPhoto.fulfilled , (state, action) => {
            state.loading = false
            state.sucess = true
            state.error = null
            state.photo = action.payload
            state.photos.unshift(state.photo)
            state.message = "Foto adicionada com sucesso"
        })
        .addCase(publishPhoto.rejected, (state, action) =>{
            state.loading = false
            state.error = action.payload
            state.photo = {}
        })
        .addCase(getUserPhotos.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getUserPhotos.fulfilled, (state, action) => {
            state.loading = false;
            state.sucess = true;
            state.error = null;
            state.photos = action.payload;
        })
        .addCase(deletePhoto.pending , (state) => {
            state.loading = true
            state.error = false
        })
        .addCase(deletePhoto.fulfilled , (state, action) => {
            state.loading = false
            state.sucess = true
            state.error = null

            state.photos = state.photos.filter(photo => {
                return photo._id !== action.payload.id
            })
            state.message = action.payload.message
        })
        .addCase(deletePhoto.rejected, (state, action) =>{
            state.loading = false
            state.error = action.payload
            state.photo = {}
        })
        .addCase(updatePhoto.pending , (state) => {
            state.loading = true
            state.error = false
        })
        .addCase(updatePhoto.fulfilled , (state, action) => {
            state.loading = false
            state.sucess = true
            state.error = null

            state.photos.map((photo) => {
                if (photo._id === action.payload._id) {
                    return (photo.title = action.payload.photo.title)
                }
                return photo
            })
            state.message = "Foto atualizada com sucesso"
        })
        .addCase(updatePhoto.rejected, (state, action) =>{
            state.loading = false
            state.error = action.payload
            state.photo = {}
        })
        .addCase(getPhotoById.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getPhotoById.fulfilled, (state, action) => {
            state.loading = false;
            state.sucess = true;
            state.error = null;
            state.photo = action.payload;
        })
        .addCase(like.fulfilled, (state, action) => {
            state.loading = false;
            state.sucess = true;
            state.error = null;
            if (state.photo.likes) {
            state.photo.likes.push(action.payload.userId);
            }

            state.photos.map((photo) => {
            if (photo._id === action.payload.photoId) {
                return photo.likes.push(action.payload.userId);
            }
            return photo;
            });

            state.message = action.payload.message;
        })
        .addCase(like.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.errors;
            if (state.photo.likes) {
                state.photo.likes = action.payload.likesArray

            }
            state.photos.map((photo) => {
                if (photo._id === action.payload.photoId) {
                    return photo.likes = action.payload.likesArray;
                }
                return photo;
                });
            
        })
        .addCase(comment.fulfilled, (state, action) => {
            state.loading = false;
            state.sucess = true;
            state.error = null;

            state.photo.comments.push(action.payload.comment)

            state.message = action.payload.message;
        })
        .addCase(comment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getAllPhoto.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getAllPhoto.fulfilled, (state, action) => {
            state.loading = false;
            state.sucess = true;
            state.error = null;
            state.photos = action.payload;
          })
        .addCase(SearchPhoto.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(SearchPhoto.fulfilled, (state, action) => {
            state.loading = false;
            state.sucess = true;
            state.error = null;
            state.photos = action.payload;
          })
    }
})

export const {resetMessage} = photoSlice.actions
export default photoSlice.reducer