import React, { Component } from 'react';
import { Container } from './LoginStyle';
import SimplePasswordValidator from 'simple-react-validator';
import axios from 'axios';
import { history } from '../../History';
import { Link } from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            loading: false,
            userNiceName: '',
            userEmail: '',
            error: ''
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.onChange = this.onChange.bind(this);
        this.validator = new SimplePasswordValidator();
    }
    handleLogin = (evt) => {
        evt.preventDefault()
        const { username, password } = this.state
        const loginForm = {
            username: username,
            password: password
        }
        if(this.validator.allValid()) {
            axios.post(`${process.env.REACT_APP_MAIN_URL}/wp-json/jwt-auth/v1/token`, loginForm)
                .then((response)=>{
                    if(undefined === response.data.token) {
                        this.setState({loading: false})
                        console.log(response.data)
                        return;
                    }
                    const { token, user_nicename, user_email } = response.data
                    localStorage.setItem('token', token)
                    localStorage.setItem('username', user_nicename)
                    this.setState({
                        token: token,
                        userNiceName: user_nicename,
                        userEmail: user_email
                    })
                })
                .then((success) => {
                    const user = (this.state.userNiceName) ? this.state.userNiceName: localStorage.getItem('username')
                    if(localStorage.getItem('username')) {
                        history.push(`/dashboard/${user}`);
                        this.props.alert.success('Im coming dashboard, Im coming dashboard!')
                    }
                })
                .catch((error) =>{
                    console.log(error)
                    this.setState({
                        error: error.response.data.message,
                        loading: false
                    })
                    this.props.alert.error('Your wrong mate go back, your not welcome here!')
            })
        } else {
            this.forceUpdate();
            this.validator.showMessages();
        }
    }
    onChange = (evt) => {
        this.setState({[evt.target.name]:evt.target.value});
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
                        <Link to="#" className="forg-link">Forgot Password or Username</Link>
                    </form>
                </Container>
            </div>
        );
    }
}

export default Login;
