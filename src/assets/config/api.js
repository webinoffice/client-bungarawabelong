import axios from 'axios'

export const API = axios.create({
    baseURL: "http://45.9.191.59:8080/"
})

// export const setAuthToken = (token) => {
//     if(token){
//         API.defaults.headers.common['Authorization'] = `Bearer ${token}`
//     }else{
//         delete API.defaults.headers.common['Authorization']
//     }
// }