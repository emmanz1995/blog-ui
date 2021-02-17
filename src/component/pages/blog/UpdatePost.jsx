import React, { Component } from 'react'
import axios from 'axios'
import Navbar from '../../layout/navbar/Navbar'
import CustomTextField from '../../layout/CustomTextField'
import CustomTextArea from '../../layout/CustomTextArea'
import Button from "react-bootstrap/Button";

const API_URL = process.env.REACT_APP_MAIN_URL

class UpdatePost extends Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
        this.state = {
            post: {},
            title: '',
            content: '',
            postUpdated: false,
            isLoading: false,
            message: '',
            user: localStorage.getItem('username')
        }
    }

    componentDidMount() {
        this.getPost()
    }

    onChange(evt) {
        this.setState({[evt.target.value]: evt.target.name})
    }

    getPost() {
        const id = this.props.match.params.id
        axios.get(`${API_URL}/wp-json/wp/v2/posts/${id}`)
            .then(res => {
                this.setState({
                    post: res.data,
                    isLoading: true
                })
                console.log('Post', res.data)
            })
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
                    value={this.state.post?.title?.rendered}
                />
                <CustomTextArea
                    as="textarea"
                    value={this.state.post?.content?.rendered}
                    rows="7"
                    onChange={this.onChange}
                />
                <Button onClick={this.updatePost}>Update</Button>
            </div>
        )
    }
}

export default UpdatePost
