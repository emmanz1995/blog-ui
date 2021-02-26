import React, { Component } from 'react'
import Navbar from '../../layout/navbar/Navbar'
import { MainWrapper } from './ProfileStyle'
import UserService from '../../../services/UserService'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import moment from 'moment'
import {BannerContainer, SubNav} from "./ProfileStyle";
import {Link} from "react-router-dom";
import AddNewPost from "../blog/AddNewPost";

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
                    <hr />
                    <h1>Last Name</h1>{currentUser?.last_name}
                    <hr />
                    <h1>Email</h1>{currentUser?.email}
                    <hr />
                    <h1>Role</h1>
                    {currentUser?.roles}
                    <hr />
                    <h1>Date Joined</h1>
                    <div className="btn-flex">
                        {moment (currentUser?.registered_date).format("DD/MM/YYYY")}
                        <Button className="btn-bin"><i className="fas fa-trash" /></Button>
                    </div>
                </div>
        if(isLoading) {
            return(
                <MainWrapper>
                    <Navbar user={currentUser?.name} />
                    <BannerContainer>
                        <div className="center-alignment">
                            <p style={{textAlign: 'left', fontSize: '25px', margin: '5px'}}>Welcome Back<b>{' '}{currentUser?.name}</b></p>
                            <br />
                            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                <SubNav>
                                    <ul>
                                        <Link to={`/dashboard/${currentUser?.name}`} className="link">Dashboard</Link>
                                        <Link to={`/profile/${currentUser?.name}`} className="link">Profile</Link>
                                        <Link to={`/home/${currentUser?.name}`} className="link">Blog</Link>
                                    </ul>
                                </SubNav>
                                {/*<AddNewPost alert={this.props.alert} />*/}
                            </div>
                        </div>
                    </BannerContainer>
                    <div className="profile__main">
                        <h1>User Profile</h1>
                        {User}
                    </div>
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
