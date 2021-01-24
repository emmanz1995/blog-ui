import React, { Component } from 'react';
import Navbar from '../../layout/navbar/Navbar';
import { Container } from './LoginStyle';
import SimplePasswordValidator from 'simple-react-validator';
import axios from 'axios';
import { history } from '../../History';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            loading: false,
            userNiceName: '',
            userEmail: '',
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
                        history.push(`/home/${user}`);
                        alert('Im coming dashboard, Im coming dashboard!')
                    }
                })
                .catch((error) =>{
                    console.log(error)
                    this.setState({
                        error: error.response.data.message,
                        loading: false
                    })
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
        return (
            <div>
                {/*<Navbar />*/}
                <Container>
                    <form onClick={this.handleLogin}>
                        <h2>Login</h2>
                        <input className="input-username" type="text" placeholder="Your Username" name="username" onChange={this.onChange} value={this.state.username} /><br/>
                        <input id="input-password" type="password" placeholder="Your Password" name="password" onChange={this.onChange} value={this.state.password} /><br/>
                        <button className="login-btn">Login</button>
                    </form>
                </Container>
            </div>
        );
    }
}

export default Login;
