import axios from 'axios'

const API_URL = process.env.REACT_APP_MAIN_URL

class AuthService {
    login(username, password) {
        return axios.post(`${API_URL}/wp-json/jwt-auth/v1/token`,{
            username,
            password
        })
            .then((response) => {
                if(response.data.token) {
                    const { token, user_nicename, user_email } = response.data
                    localStorage.setItem('token', token)
                    localStorage.setItem('username', user_nicename)
                    localStorage.setItem('userEmail', user_email)
                    localStorage.setItem('userDetails', JSON.stringify(response.data))
                }
                console.log(response.data)
            })
    }

    getUser() {
       return JSON.parse(localStorage.getItem('userDetails'))
    }
}

export default new AuthService()
