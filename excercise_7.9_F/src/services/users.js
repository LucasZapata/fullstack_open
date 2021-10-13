import axios from 'axios'
const baseUrl = '/api/users'

const getList = async () => {
    const response = await axios.get(`${baseUrl}/list`)
    return response.data
}

export default {getList}

