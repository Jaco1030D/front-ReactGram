import { api, requestConfig } from "../utils/configure";

const register = async (data) => {
    const config = requestConfig("POST", data)

    try {
        const res = await fetch(api + "/users/register", config)
        .then((res) => 
            res.json()
        )
        .catch((err) => err)
        if (!res.errors) {
            localStorage.setItem("user", JSON.stringify(res))
        }
        return res
    } catch (error) {
        console.log(error)
    }
}
const login = async (data) =>{
    const config = requestConfig("POST", data)

    try {
        const res = await fetch(api + "/users/login", config)
        .then((res) => 
        
        res.json()

        )
        .catch((err) => err)

        if (!res.errors) {
            localStorage.setItem("user", JSON.stringify(res))
        }
        return res
    } catch (error) {
        console.log(error)
    }
}

const logout = () =>{
    localStorage.removeItem("user")
}

const AuthServices = {
    register,
    login,
    logout
}

export default AuthServices