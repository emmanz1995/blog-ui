import React, { Component } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Button from "react-bootstrap/Button";
import {Spinner} from "react-bootstrap";

const StyledCard = styled(Card)`
  width: 49%;
  margin: 5px;
`

const MainContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

class MainDisplayPost extends Component {
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
                // console.log('Posts: ', res)
            })
            .catch((error) => console.log(error))
    }

    truncate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
    }

    render() {
        const { posts, isLoading } = this.state
        if(isLoading) {
            return(
                <MainContainer>
                    {posts.map(post =>(
                        <StyledCard key={post.id}>
                            <Card.Header>
                                <h1>{post.title?.rendered}</h1>
                            </Card.Header>
                            <Card.Body>
                                <p>{this.truncate(post.content?.rendered, 150)}</p>
                            </Card.Body>
                        </StyledCard>
                    ))}
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

export default MainDisplayPost
