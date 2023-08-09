import { api, requestConfig } from "./configure"

export const boodyRequestPhotoService = async (method, data, token = '', image, id = '', extra = '') => {
    const config = requestConfig(method, data, token, image)
    try {
        const res = await fetch(api + "/photos/" + extra + id, config)
        .then(res => res.json())
        .catch(err => err)

        return res
    } catch (error) {
        console.log(error)
    }
}

//slices
export const bodyRequestPhoto = async (thunkAPI, object, method, extra = null) =>{
    const token = thunkAPI.getState().auth.user.token;
    
    const data = await method(object, token, extra);

    if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
}