import React, { Component } from 'react'
import axios from 'axios'
import Navbar from '../../layout/navbar/Navbar'
import CustomTextField from '../../layout/CustomTextField'
import CustomTextArea from '../../layout/CustomTextArea'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Breadcrumb from 'react-bootstrap/Breadcrumb'


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
        evt.preventDefault()
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
        const { user, post } = this.state
        return(
            <div>
                <Navbar user={user} />
                <Breadcrumb>
                    <Breadcrumb.Item href={`/dashboard/${user}`}>Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item active>Update Post</Breadcrumb.Item>
                </Breadcrumb>
                <Form onClick={this.updatePost}>
                    <CustomTextField
                        type="text"
                        name="title"
                        value={post?.title?.rendered}
                        onChange={this.onChange}

                    />
                    <CustomTextArea
                        as="textarea"
                        value={post?.content?.rendered}
                        rows="7"
                        onChange={this.onChange}
                    />
                    <Button>Update</Button>
                </Form>
            </div>
        )
    }
}

export default UpdatePost
