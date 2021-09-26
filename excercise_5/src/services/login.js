import axios from 'axios'
const baseUrl = '/api/login'

const login = async (username, password) => {
    const response = axios.post(baseUrl, { username, password })
    return response
}

export default login