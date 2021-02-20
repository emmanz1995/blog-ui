import React, { Component } from 'react'
import axios from 'axios'
import Navbar from '../../layout/navbar/Navbar'
import { MainWrapper } from './ProfileStyle'

const API_URL = process.env.REACT_APP_MAIN_URL
const id = localStorage.getItem('id')
const token = localStorage.getItem('token')

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            users: localStorage.getItem('username'),
            isLoading: false,
        }
    }
    componentDidMount() {
        axios({
            method: "GET",
            url:`${API_URL}/wp-json/wp/v2/users/${id}/?context=edit`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if(response.status === 200) {
                    this.setState({
                        user: response.data,
                        isLoading: true,
                        // roles: response.data.roles,
                        // capabilities: response.data.capabilities
                    })
                    const obj = {
                        "role": response.data.roles,
                        "capabilities": response.data.capabilities,
                        "id": response.data.id
                    }
                    localStorage.setItem('Authorities', JSON.stringify(obj))
                    console.log('User was retrieved!')
                } else if(response.status === 404) {
                    console.log('User was not found!')
                }
                console.log('user: ', response.data)
            })
    }
    render() {
        const User =
        <div className="profile__container">
            <h1>First Name</h1> {this.state.user?.first_name}
            <h1>Last Name</h1>{this.state.user?.last_name}
            <h1>Email</h1>{this.state.user?.email}
            <h1>Role</h1>{this.state.user?.roles}
        </div>
        return(
            <MainWrapper>
                <Navbar user={this.state.users} />
                {User}
            </MainWrapper>
        )
    }
}

export default Profile
