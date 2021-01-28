import React, { Component } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import styled from 'styled-components'

const StyledCard = styled(Card)`
  width: 40%;
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
    componentDidMount() {
        axios.get(`${process.env.REACT_APP_MAIN_URL}/wp-json/wp/v2/posts`)
            .then((res) => {
                this.setState({
                    posts: res.data,
                    isLoading: true
                })
                console.log('Posts: ', res)
            })
            .catch((error) => console.log(error))
    }
    render() {
        const { posts } = this.state
        const postsDisplay = posts.map(post => (
            <StyledCard key={post}>
                <Card.Header>
                    <h2>{post.title?.rendered}</h2>
                </Card.Header>
                <Card.Body>
                    <p dangerouslySetInnerHTML={{ __html: post.content?.rendered }} />
                </Card.Body>
            </StyledCard>
        ))
        return(
            <MainContainer>
                {postsDisplay}
            </MainContainer>
        )
    }
}

export default DisplayPost
