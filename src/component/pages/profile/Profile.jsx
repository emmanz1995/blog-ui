import React, { Component } from 'react'
import Navbar from '../../layout/navbar/Navbar'
import { MainWrapper } from './ProfileStyle'
import UserService from '../../../services/UserService'
import Spinner from "react-bootstrap/Spinner";

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            currentUser: null
        }
    }
    componentDidMount() {
        UserService.getUserInfo()
        .then((response) => {
            if(response.status === 200) {
                this.setState({
                    currentUser: response.data,
                    isLoading: true
                })
                const obj = {
                    "role": response.data.roles,
                    "capabilities": response.data.capabilities,
                    "id": response.data.id
                }
                localStorage.setItem('Authorities', JSON.stringify(obj))
                console.log('Found you!!')
            }
        })
        .catch((err) => console.log(err))
    }

    render() {
        const { currentUser, isLoading } = this.state
            const User =
                <div className="profile__container">
                    <h1>First Name</h1>{currentUser?.first_name}
                    <h1>Last Name</h1>{currentUser?.last_name}
                    <h1>Email</h1>{currentUser?.email}
                    <h1>Role</h1>{currentUser?.roles}
                </div>
        if(isLoading) {
            return(
                <MainWrapper>
                    <Navbar user={currentUser?.name} />
                    {User}
                </MainWrapper>
            )
        } else {
            return (
                <>
                    <Spinner animation="border" />
                </>
            )
        }
    }
}

export default Profile
