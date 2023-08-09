import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthServices from "../services/AuthServices";

const user = JSON.parse(localStorage.getItem("user"))

const initialState ={
    user: user ? user : null,
    error: false,
    sucess: false,
    loading: false
}

export const register = createAsyncThunk(
    "auth/register",
    async (user, thunkAPI) => {
        const data = await AuthServices.register(user)

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data
    }
)
export const login = createAsyncThunk(
    "auth/login",
    async (user, thunkAPI) => {
        const data = await AuthServices.login(user)

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data
    }
)
export const logout = createAsyncThunk(
    "auth/logout",
    async() => {
        await AuthServices.logout()
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) =>{
            state.loading = false
            state.error = false
            state.sucess =false
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(login.pending || register.pending, (state) => {
            state.loading = true
            state.error = false
        })
        .addCase(login.fulfilled || register.fulfilled, (state, action) => {
            state.loading = false
            state.sucess = true
            state.error = null
            state.user = action.payload
        })
        .addCase(login.rejected || register.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.user = null
        })
        .addCase(logout.fulfilled, (state) => {
            state.loading = false
            state.sucess = true
            state.error = null
            state.user = null
        })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer