import axios from 'axios'

const http = axios.create()

http.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

http.interceptors.request.use((config)=>{
    config.headers.Authorization = sessionStorage.getItem("token")||''
    return config
})



export default http