import axios from 'axios'
const url = '/api/persons'

const GetDB = () =>{
    const request = axios.get(url)
    return request.then(response => response.data)
}

const AddDB = (NewData) =>{
    const request = axios.post(url, NewData)
    return request.then(response => response.data)
}

const EditDB = (id, NewData) =>{
    const request = axios.put(`${url}/${id}`, NewData)
    return request.then(response => response.data)
}

const RemoveDB = (id) =>{
    const request = axios.delete(`${url}/${id}`)
    return request.then(response => response.data)
}


export default{GetDB, AddDB, EditDB, RemoveDB}