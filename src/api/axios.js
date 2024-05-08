import axios from "axios"

const Axios = axios.create({
    withCredentials: true,
    baseURL:"http://localhost:8080"
})

Axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${sessionStorage.getItem('token')}`
    return config
})

export default Axios;