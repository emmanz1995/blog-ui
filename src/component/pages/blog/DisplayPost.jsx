import React, { Component } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import styled from 'styled-components'
import { Link } from "react-router-dom";

const StyledCard = styled(Card)`
  width: 49%;
  margin: 5px;
`

const MainContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

class DisplayPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            posts: []
        }
    }
    // createMarkup = (data) => ({
    //     __html: data
    // })

    componentDidMount() {
        const token = localStorage.getItem('token')
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_MAIN_URL}/wp-json/wp/v2/posts`,
            header: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                this.setState({
                    posts: res.data,
                    isLoading: true
                })
                console.log('Posts: ', res)
            })
            .catch((error) => console.log(error))
    }

     truncate( string, n ) {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
     }

    render() {
        const { posts, isLoading } = this.state
        const postsDisplay = posts.map(post => (
            <StyledCard key={post.id}>
                <Card.Header>
                    <h2>{post.title?.rendered}</h2>
                </Card.Header>
                <Card.Body>
                    <p>{this.truncate(post.content?.rendered, 150)}</p>
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
                <div>Loading...</div>
            )
        }
    }
}

export default DisplayPost

// <p dangerouslySetInnerHTML={{ __html: post.content?.rendered }} />
