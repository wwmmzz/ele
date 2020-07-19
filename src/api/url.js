import http from './axiosconfig'

const getData = {}

getData.login = (data)=>{
   return http.post('/login', 
    data
   
   )
}

getData.userlist = (params)=>{
    return http.get('/users',{
        params
    })
}

export default getData