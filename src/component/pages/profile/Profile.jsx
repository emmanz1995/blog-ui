import React, { Component } from 'react'
import axios from "axios";
import Navbar from "../../layout/navbar/Navbar";

const API_URL = process.env.REACT_APP_MAIN_URL
const id = localStorage.getItem('id')
const token = localStorage.getItem('token')

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            users: localStorage.getItem('username')
        }
    }
    componentDidMount() {
        axios({
            method: "GET",
            url:`${API_URL}/wp-json/wp/v2/users/${id}?context=edit`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if(response.status === 200) {
                    this.setState({
                        user: response.data
                    })
                    console.log('User was retrieved!')
                } else if(response.status === 401) {
                    console.log('User was not found!')
                }
                console.log('user: ', response.data)
            })
    }
    render() {
        const User = <table>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
            </tr>
            <tr>
                <th>{this.state.user?.first_name}</th>
                <th>{this.state.user?.last_name}</th>
                <th>{this.state.user?.email}</th>
                <th>{this.state.user?.roles}</th>
            </tr>
        </table>
        return(
            <div>
                <Navbar user={this.state.users} />
                {User}
            </div>
        )
    }
}

export default Profile
