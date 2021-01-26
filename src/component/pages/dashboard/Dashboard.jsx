import React, {Component} from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Navbar from '../../layout/navbar/Navbar';
import { MainContainer, BannerContainer, SubNav } from './DashboardStyled'
import axios from 'axios'
import AddNewPost from "../blog/AddNewPost";
import DisplayPost from "../blog/DisplayPost";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('username'),
            users: []
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
            .then((res) =>{
                const users = res.data
                this.setState({
                    res: users,
                })
            }).catch(error => console.log(error))
    }
    render() {
        return (
            <MainContainer>
                <Navbar user={this.state.user} />
                <BannerContainer>
                    <p style={{textAlign: 'left', fontSize: '25px', margin: '5px'}}>Welcome home <b>{this.state.user}</b></p>
                    <br />
                    <SubNav>
                        <ul>
                            <Link className="link">Home</Link>
                            <Link className="link">About</Link>
                        </ul>
                    </SubNav>
                </BannerContainer>
                <br />
                {/*<p>{this.state.res?.name}</p>*/}
                <div className="flex-container">
                    {/*<AddNewPost />*/}
                    <DisplayPost />
                </div>
            </MainContainer>
        )
    }
}

export default Dashboard
