import React, { Component } from 'react'
import axios from 'axios'
import Navbar from '../../layout/navbar/Navbar'
import CustomTextField from '../../layout/CustomTextField'
import CustomTextArea from '../../layout/CustomTextArea'

class UpdatePost extends Component {
    state = {
        post: {},
        title: '',
        content: '',
        postUpdated: false,
        isLoading: false,
        message: '',
        user: localStorage.getItem('username')
    }
    componentDidMount() {
        this.updatePost()
    }

    updatePost = (evt) => {
        const formdata = {
            title: this.state.title,
            content: this.state.content,
            status: 'publish'
        }
        const id = this.props.match.params.id
        const token = localStorage.getItem('token')
        axios.put(`${process.env.REACT_APP_MAIN_URL}/wp-json/wp/v2/posts/${id}`, formdata, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            }
        })
            .then((response) => {
                this.setState({
                    postUpdated: !! response.data.id,
                    message: !! response.data.id ? 'Post Updated' : '',
                    isLoading: false
                })
            })
    }
    render() {
        return(
            <div>
                <Navbar user={this.state.user} />
                <CustomTextField
                    value={this.state.post.title}
                />
                <CustomTextArea />
            </div>
        )
    }
}

export default UpdatePost
