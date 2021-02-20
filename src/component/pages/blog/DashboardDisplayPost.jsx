import React, { Component } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import * as moment from 'moment'

const StyledCard = styled(Card)`
  width: 49%;
  margin: 5px;
`

const MainContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const API_URL = process.env.REACT_APP_MAIN_URL
const token = localStorage.getItem('token')

class DashboardDisplayPost extends Component {
    constructor(props) {
        super(props)
        this.deletePost = this.deletePost.bind(this)
        this.state = {
            isLoading: false,
            posts: []
        }
    }

    componentDidMount() {
        this.getPosts(localStorage.getItem('id'))
    }

    getPosts(authorId) {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_MAIN_URL}/wp-json/wp/v2/posts`,
            params: { author: authorId },
            header: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            this.setState({
                posts: res.data,
                isLoading: true,
                author: res.data
            })
        })
        .catch((error) => console.log(error))
    }

    deletePost = (id) => {
        axios({
            method: "delete",
            url: `${API_URL}/wp-json/wp/v2/posts/${id}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res) => {
            if(res.status === 200) {
                console.log('Post was deleted successfully')
                alert('Post was deleted successfully')
            } else if(res.status === 401) {
                console.log('Post was not deleted')
            }
        })
    }

     truncate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
     }

    render() {
        const { posts, isLoading } = this.state
        const postsDisplay = posts.map(post => (
            <StyledCard key={post.id}>
                <Card.Header>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h2>{post.title?.rendered}</h2>
                        {this.props.user ? (
                            <>
                                {/*<Link to={`/update-post/${post.id}`}>Update</Link>*/}
                                <Button onClick={()=>this.deletePost(post.id)}><i className="fas fa-trash" /></Button>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                </Card.Header>
                <Card.Body>
                    <p>{this.truncate(post.content?.rendered, 100)}</p>
                    <p><em>Published:{' '}</em>{moment(post.date).format('DD/MM/YY, h:mm a')}</p>
                    <Link to={`/post/${post.id}`}>Click to read more</Link>
                </Card.Body>
            </StyledCard>
        ))
        if(isLoading) {
            return(
                <MainContainer>
                    {postsDisplay}
                </MainContainer>
            )
        } else {
            return(
                <div>
                    <Spinner animation="border"/>
                </div>
            )
        }
    }
}

export default DashboardDisplayPost

// TODO Experiment with this code later
// <p dangerouslySetInnerHTML={{ __html: post.content?.rendered }} />

// TODO Finish working on this block of code
// createMarkup = (data) => ({
//     __html: data
// })
