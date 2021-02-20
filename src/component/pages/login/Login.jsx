import React, { Component } from 'react'
import { Container } from './LoginStyle'
import SimplePasswordValidator from 'simple-react-validator'
import { history } from '../../History'
import { Link } from 'react-router-dom'
import AuthService from '../../../services/AuthService'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            loading: false,
            error: '',
            userInfo: localStorage.getItem('username')
        }
        this.handleLogin = this.handleLogin.bind(this)
        this.onChange = this.onChange.bind(this)
        this.validator = new SimplePasswordValidator()
    }
    handleLogin = (evt) => {
        evt.preventDefault()
        const { username, password } = this.state
        if(this.validator.allValid()) {
            AuthService.onLogin(username, password)
            .then(() => {
                const user = (this.state.userInfo) ? this.state.userInfo: localStorage.getItem('username')
                if(localStorage.getItem('username')) {
                    history.push(`/dashboard/${user}`)
                }
                this.props.alert.success(`Congrats ${user}, you are obviously wanted here!`)
            })
            .catch((error) => {
                console.log(error)
                this.props.alert.error(error)
            })
        } else {
            this.forceUpdate()
            this.validator.showMessages()
        }
    }
    onChange = (evt) => {
        this.setState({[evt.target.name]:evt.target.value})
    }
    render() {
        const { username, password } = this.state
        return (
            <div>
                <Container>
                    <form onClick={this.handleLogin}>
                        <h2>Login <i className="fas fa-user-lock" /></h2>
                        <div className="form-input">
                            <i className="far fa-user" />
                            <input className="input-username" type="text" placeholder="Your Username" name="username" onChange={this.onChange} value={username} />
                        </div>
                        {this.validator.message('username', username, 'required|username', {className: 'text-danger'})}<br/>
                        <div className="form-input">
                            <i className="fas fa-key" />
                            <input id="input-password" type="password" placeholder="Your Password" name="password" onChange={this.onChange} value={password} />
                        </div>
                        {this.validator.message('password', password, 'required|password|min:6|max:20', {className: 'text-danger'})}<br/>
                        <button className="login-btn">Login</button>
                        <br />
                        <Link to="#" className="forg-link">Need a new account? Register Now!</Link>
                    </form>
                </Container>
            </div>
        );
    }
}

export default Login
