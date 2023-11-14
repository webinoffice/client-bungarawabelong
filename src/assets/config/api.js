import axios from 'axios'

export const API = axios.create({
    baseURL: "http://localhost:8081/"
})

// export const setAuthToken = (token) => {
//     if(token){
//         API.defaults.headers.common['Authorization'] = `Bearer ${token}`
//     }else{
//         delete API.defaults.headers.common['Authorization']
//     }
// }