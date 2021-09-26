import axios from 'axios'
const baseUrl = '/api/blogs'
let token = ''

const setToken = (loginToken) => {token = `bearer ${loginToken}`
    console.log(token)}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const postBlog = async(blogData) => {
    try{const response = await axios.post(baseUrl, blogData, { headers:{ authorization:token } })
        return response.data}
    catch (error) {console.error(error)}
}

const updateBlog = async(blogData) => {
    try{const response = await axios.put(`${baseUrl}/${blogData.id}`, blogData, { headers:{ authorization:token } })
        return response.data}
    catch (error) {console.error(error)}
}

const deleteBlog = async(blogData) => {
    try{const response = await axios.delete(`${baseUrl}/${blogData.id}`, { headers:{ authorization:token } })
        return response}
    catch (error) {console.error(error)}
}

export default { getAll, postBlog, setToken, updateBlog, deleteBlog }