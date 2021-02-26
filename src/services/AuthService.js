import axios from 'axios'

const API_URL = process.env.REACT_APP_MAIN_URL
const token = localStorage.getItem('token')

class AuthService {
    onLogin(username, password) {
        return axios.post(`${API_URL}/wp-json/jwt-auth/v1/token`,{
            username,
            password
        })
            .then((response) => {
                if(response.data.token) {
                    const { token, user_nicename } = response.data
                    localStorage.setItem('token', token)
                    localStorage.setItem('username', user_nicename)
                    localStorage.setItem('userDetails', JSON.stringify(response.data))
                }
                console.log(response.data)
            })
    }

    getUser() {
       return JSON.parse(localStorage.getItem('userDetails'))
    }

    onRegister(username, first_name, last_name, email, password) {
        return axios.post(API_URL + '/wp-json/wp/v2/users/',{
            username,
            first_name,
            last_name,
            email,
            password,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }
}

export default new AuthService()
