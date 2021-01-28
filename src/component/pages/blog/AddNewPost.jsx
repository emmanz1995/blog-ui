import React, { Component } from 'react'
import styled from 'styled-components'
import SimpleReactValidator from 'simple-react-validator'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import CustomTextField from '../../layout/CustomTextField'
import Modal from 'react-bootstrap/Modal'
import CustomTextArea from "../../layout/CustomTextArea";

class AddNewPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            content: '',
            status: '',
            show: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.validator = new SimpleReactValidator()
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        //TODO handle logic code here
    }

    handleShow(){
        this.setState({
            show: true
        })
    }

    handleClose() {
        this.setState({
            show: false
        })
    }

    onChange = (evt) => {
        this.setState({[evt.target.name]: evt.target.value})
    }

    render() {
        return(
            <>
                <ModalButton onClick={this.handleShow}>Add New Post</ModalButton>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>Create a new Article Post</Modal.Header>
                    <Modal.Body>
                        <CustomTextField
                            type="text"
                            placeholder="Enter your Post's title"
                            value={this.state.title}
                            onChange={this.onChange}
                            name="title"
                        />
                        <CustomTextArea
                            as="textarea"
                            rows={3}
                            placeholder="Start typing your post"
                            value={this.state.content}
                            onChange={this.onChange}
                            name="content"
                        />
                        <CustomTextField
                            type="text"
                            placeholder="Publish your post"
                            value={this.state.status}
                            onChange={this.onChange}
                            name="status"
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <StyledButton variant="outline" onClick={this.handleSubmit}>Submit Post</StyledButton>
                        <Button variant="outline-danger" onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default AddNewPost

const StyledButton = styled(Button)`
  background-color: ${props => props.theme.MainColor};
  //margin-left: -94%;
`
const ModalButton = styled(Button)`
  height: 40px;
  background-color: ${props => props.theme.MainColor};
  margin: 5px;
`
