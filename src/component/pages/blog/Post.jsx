import React, { Component } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Navbar from '../../layout/navbar/Navbar'
import Breadcrumb from 'react-bootstrap/breadcrumb'
import styled from 'styled-components'

class Post extends Component {
    state = {
        post: {},
        isLoading: false
    }
    componentDidMount() {
        axios.get(`${process.env.REACT_APP_MAIN_URL}/wp-json/wp/v2/posts/${this.props.match.params.id}`)
            .then(res => this.setState({
                isLoading: true,
                post: res.data,
                user: localStorage.getItem('username')
            }))
            .catch(error => console.log(error))
    }

    render() {
        const { post, isLoading } = this.state
        const SinglePost =
            <Card style={{width: '50%', margin: '5px'}}>
            <Card.Header>
                <p>{post.title?.rendered}</p>
            </Card.Header>
            <Card.Body>
                <p dangerouslySetInnerHTML={{__html: post.content?.rendered}}/>
            </Card.Body>
        </Card>
        if(isLoading) {
            return (
                <div>
                    <Navbar user={this.state.user}/>
                    <Breadcrumb>
                        <h1>{post.title?.rendered}</h1><br/><br/>
                        {!this.state.user ? (
                            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                            ) : (
                                <Breadcrumb.Item href={`/dashboard/${this.state.user}`}>
                                    Dashboard
                                </Breadcrumb.Item>
                            )}
                        <Breadcrumb.Item active>
                            Single Post
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    {SinglePost}
                </div>
            )
        } else {
            return (
                <div>
                    <p>Loading...</p>
                </div>
            )
        }
    }
}

export default Post
