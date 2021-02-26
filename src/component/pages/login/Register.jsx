import React from 'react'
import CustomTextField from '../../layout/CustomTextField'
import SimpleReactValidator from 'simple-react-validator'
import AuthService from '../../../services/AuthService'
import { history } from '../../History'

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.handleRegister = this.handleRegister.bind(this)
        this.onChange = this.onChange.bind(this)
        this.validator = new SimpleReactValidator()
        this.state = {
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            successful: false
        }
    }
    handleRegister = (evt) => {
        evt.preventDefault()
        if(this.validator.allValid()) {
            AuthService.onRegister(this.state.username, this.state.first_name, this.state.last_name, this.state.email, this.state.password)
                .then((response) => {
                    if(response.status === 200) {
                        history.push("/login")
                        this.props.alert.success('Your account was created, please log in!')
                    }
                })
        } else {
            this.forceUpdate()
            this.validator.showMessages()
        }
    }
    onChange = (evt) => {
        this.setState({[evt.target.name]: evt.target.value})
    }
    render() {
        return(
            <div>
                <form onClick={this.handleRegister}>
                    <CustomTextField
                        type="text"
                        name="username"
                        value={this.state.username}
                        placeholder="Your username"
                        onChange={this.onChange}
                    />
                    <CustomTextField
                        type="text"
                        name="first_name"
                        value={this.state.first_name}
                        placeholder="Your First Name"
                        onChange={this.onChange}
                    />
                    <CustomTextField
                        type="text"
                        name="last_name"
                        value={this.state.last_name}
                        placeholder="Your Last Name"
                        onChange={this.onChange}
                    />
                    <CustomTextField
                        type="text"
                        name="email"
                        value={this.state.email}
                        placeholder="Your Email"
                        onChange={this.onChange}
                    />
                    <CustomTextField
                        type="password"
                        name="password"
                        value={this.state.password}
                        placeholder="Your password"
                        onChange={this.onChange}
                    />
                    <button>Register</button>
                </form>
            </div>
        )
    }
}

export default Register
