import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userServices from "../services/UserServices";

const initialState ={
    user: {},
    error: false,
    sucess: false,
    loading: false,
    message: null
}
export const profile = createAsyncThunk(
    "user/profile",
    async (user, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token

        const data = await userServices.profile(user, token)

        return data
    }
)

export const updateProfile = createAsyncThunk(
    "user/update",
    async(user, thunkAPI) =>{
        const token = thunkAPI.getState().auth.user.token

        const data = await userServices.updateProfile(user, token)

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }
        return data
    }
)

export const getuserDetails = createAsyncThunk(
    "user/get",
    async(id, thunkAPI) =>{
        try {
            const token = thunkAPI.getState().auth.user.token
            const data = await userServices.getuserDetails(id, token)
            return data
        } catch (error) {
            console.log(error)
        }
        

        
    }
)
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        resetMenssage: (state) =>{
            state.message = null
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(profile.pending , (state) => {
            state.loading = true
            state.error = false
        })
        .addCase(profile.fulfilled , (state, action) => {
            state.loading = false
            state.sucess = true
            state.error = null
            state.user = action.payload
        })
        .addCase(updateProfile.pending , (state) => {
            state.loading = true
            state.error = false
        })
        .addCase(updateProfile.fulfilled , (state, action) => {
            state.loading = false
            state.sucess = true
            state.error = null
            state.user = action.payload
            state.message = "Usuario atualizado com sucesso"
        })
        .addCase(updateProfile.rejected , (state, action) => {
            state.loading = false
            state.error = action.payload
            state.user = {}
        })
        .addCase(getuserDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getuserDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.sucess = true;
            state.error = null;
            state.user = action.payload;
          });
    }
})

export const {resetMenssage} = userSlice.actions
export default userSlice.reducer