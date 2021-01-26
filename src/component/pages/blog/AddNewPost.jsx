import React, { Component } from 'react'
import styled from 'styled-components'
import SimpleReactValidator from 'simple-react-validator'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import CustomTextField from '../../layout/CustomTextField'

class AddNewPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            content: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.validator = new SimpleReactValidator()
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        //TODO handle logic code here
    }

    onChange = (evt) => {
        this.setState({[evt.target.name]: evt.target.value})
    }

    render() {
        return(
            <Form style={{margin: '7px', width: '30%'}} onClick={this.handleSubmit}>
                <CustomTextField
                    type="text"
                    placeholder="Enter your Post's title"
                    value={this.state.title}
                    onChange={this.onChange}
                    name="title"
                />
                <CustomTextField
                    type="text"
                    placeholder="Start typing your post"
                    value={this.state.content}
                    onChange={this.onChange}
                    name="content"
                />
                <StyledButton>Submit Post</StyledButton>
            </Form>
        )
    }
}

export default AddNewPost

const StyledButton = styled(Button)`
  background-color: ${props => props.theme.MainColor};
  //margin-left: -94%;
`
