import {configureStore} from '@reduxjs/toolkit'

import authReducer from './slices/AuthSlices'
import userReducer from './slices/UserSlices'
import photoReducer from './slices/PhotoSlice'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        photo: photoReducer
    }
})
