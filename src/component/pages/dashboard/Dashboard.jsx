import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Navbar from '../../layout/navbar/Navbar'
import { MainContainer, BannerContainer, SubNav } from './DashboardStyled'
import axios from 'axios'
import AddNewPost from '../blog/AddNewPost'
import DashboardDisplayPost from '../blog/DashboardDisplayPost'
import CustomTextField from '../../layout/CustomTextField'
import Button from 'react-bootstrap/Button'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('username'),
            email: localStorage.getItem('userEmail'),
            users: {}
        }
    }
    componentDidMount() {
        const token = localStorage.getItem('token')
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_MAIN_URL}/wp-json/wp/v2/users/me`,
            headers: {
                authorization: `Bearer` + token
            }
        })
            .then((res) => {
                const { users, id } = res.data
                localStorage.setItem('id', id)
                this.setState({
                    res: users,
                    id: id
                })
                console.log(users)
            }).catch(error => console.log(error))
    }
    render() {
        return (
            <MainContainer>
                <Navbar user={this.state.user} />
                {/*<img src={this.state.users?.avatar_urls} alt="image" />*/}
                <BannerContainer>
                    <div className="center-alignment">
                        <p style={{textAlign: 'left', fontSize: '25px', margin: '5px'}}>Welcome Back<b>{' '}{this.state.user} {' '} {this.state.users?.id}</b></p>
                        <br />
                        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                            <SubNav>
                                <ul>
                                    <Link to="#" className="link">Home</Link>
                                    <Link to="#" className="link">Profile</Link>
                                    <Link to="#" className="link">About</Link>
                                    <Link to="#" className="link">Manage Users</Link>
                                </ul>
                            </SubNav>
                            <AddNewPost alert={this.props.alert} />
                        </div>
                    </div>
                </BannerContainer>
                <br />
                <div style={{ maxWidth: '1070px', margin: '0 auto' }}>
                    <div className="search-form" style={{ display: 'flex'}}>
                        <CustomTextField
                            type="search"
                            name="search"
                            onChange={this.onChange}
                            placeholder="Search for a post"
                        />
                        <Button style={{ height: '40px', margin: '0 5px'}}>Search</Button>
                    </div>
                    <br />
                    <div className="flex-container">
                        <DashboardDisplayPost user={this.state.user}/>
                    </div>
                </div>
            </MainContainer>
        )
    }
}

export default Dashboard
