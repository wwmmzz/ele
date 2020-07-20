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

getData.menulist = (params)=>{
    return http.get('/menus',{
        params
    })
}

getData.adduser = (data)=>{
    return http.post('/users', data)
}

export default getData