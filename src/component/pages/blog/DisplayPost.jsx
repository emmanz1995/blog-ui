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
  flex-wrap: nowrap;
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
        return(
            <MainContainer>
                {this.state.posts.map((post, i) => {
                    return(
                        <StyledCard key={i}>
                            <Card.Header>
                                <h2>{post.title?.rendered}</h2>
                            </Card.Header>
                            <Card.Body><p>{post.content?.rendered}</p></Card.Body>
                        </StyledCard>
                    )
                })}
            </MainContainer>
        )
    }
}

export default DisplayPost
