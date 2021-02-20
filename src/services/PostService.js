import axios from 'axios'

const API_URL = process.env.REACT_APP_MAIN_URL
const authorId = localStorage.getItem('id')

class PostService {
    getPosts() {
        axios({
            method: "GET",
            url:`${API_URL}/wp-json/wp/v2/posts`,
            author: authorId
        })
    }
}

export default new PostService()
