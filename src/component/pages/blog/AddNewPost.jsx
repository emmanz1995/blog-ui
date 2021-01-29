import React, { Component } from 'react'
import styled from 'styled-components'
import SimpleReactValidator from 'simple-react-validator'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import CustomTextField from '../../layout/CustomTextField'
import Modal from 'react-bootstrap/Modal'
import CustomTextArea from '../../layout/CustomTextArea'

class AddNewPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            content: '',
            postAdded: false,
            loading: false,
            show: false,
            message: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.validator = new SimpleReactValidator()
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        this.setState({loading: true})
        const token = localStorage.getItem('token')
        const { title, content } = this.state
        const formData = {
            title: title,
            content: content,
            status: 'publish'
        }
        axios.post(`${process.env.REACT_APP_MAIN_URL}/wp-json/wp/v2/posts`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                console.warn('res', res)
                this.setState({
                    loading: false,
                    postAdded: !! res.data.id,
                    message: !! res.data.id ? 'Post Added' : '',
                    show: false
                })
            })
            .catch((error) =>{
                // this.props.alert.error('Sorry couldnt go through')
                this.setState({ loading: false, message: error.response.data.message })
                console.log('error', error.response.data)
            })
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
        this.validator.hideMessages()
    }

    onChange = (evt) => {
        this.setState({[evt.target.name]: evt.target.value})
    }

    render() {
        return(
            <>
                <ModalButton onClick={this.handleShow}>Add New Post</ModalButton>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header style={{backgroundColor: '#1BA1E2'}} closeButton>Create a new Article Post</Modal.Header>
                    <Modal.Body>
                        {this.state.message ? <div className={`alert ${this.state.postAdded ? 'alert-success': 'alert-danger'}`}>{this.state.message}</div>: ''}
                        <CustomTextField
                            type="text"
                            placeholder="Enter your Post's title"
                            onChange={this.onChange}
                            name="title"
                        />
                        <CustomTextArea
                            as="textarea"
                            rows={7}
                            placeholder="Start typing your post"
                            onChange={this.onChange}
                            name="content"
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <StyledButton variant="outline" onClick={this.handleSubmit}>Submit Post</StyledButton>
                        <Button variant="outline-danger" onClick={this.handleClose}>Close</Button>
                        {this.state.loading && <div>
                            <p>Loading...</p>
                        </div>}
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
