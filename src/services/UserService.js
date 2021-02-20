import axios from 'axios'

const API_URL = process.env.REACT_APP_MAIN_URL
const id = localStorage.getItem('id')
const token = localStorage.getItem('token')

class UserService {
    getUserInfo() {
        return axios({
            method: "GET",
            url:`${API_URL}/wp-json/wp/v2/users/${id}/?context=edit`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}

export default new UserService()
