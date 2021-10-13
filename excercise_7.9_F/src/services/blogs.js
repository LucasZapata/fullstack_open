import axios from 'axios'
const baseUrl = '/api/blogs'
const commentUrl = '/api/comment'
let token = ''

const setToken = (loginToken) => {token = `bearer ${loginToken}`
    console.log(token)}

const getAll = async () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const postBlog = async(blogData) => {
    try{const response = await axios.post(baseUrl, blogData, { headers:{ authorization:token } })
        return response.data}
    catch (error) {
        console.error(error)
        return {status:error.status, message:error.message}
    }
}

const updateBlog = async(blogData) => {
    try{const response = await axios.put(`${baseUrl}/${blogData.id}`, blogData, { headers:{ authorization:token } })
        return response}
    catch (error) {
        console.error(error)
        return {status:error.status, message:error.message}
    }
}

const deleteBlog = async(blogData) => {
    try{const response = await axios.delete(`${baseUrl}/${blogData.id}`, { headers:{ authorization:token } })
        return response}
    catch (error) {
        console.error(error)
        return {status:error.status, message:error.message}
    }
}

const postComment = async(blogId, text) =>{
    try{const response = await axios.post(`${commentUrl}/${blogId}`, text, { headers:{ authorization:token } })
        return response}
    catch (error) {
        console.error(error)
        return {status:error.status, message:error.message}
}}

const getComments = async (blogId) => {
    const request = axios.get(`${commentUrl}/${blogId}`)
    return request.then(response => response.data)
}

export default { getAll, postBlog, setToken, updateBlog, deleteBlog, getComments, postComment }