import React, {Component} from 'react'
import Button from 'react-bootstrap/Button';
// import { history } from "../../History";
import Navbar from '../../layout/navbar/Navbar';
import { MainContainer } from './DashboardStyled'
import axios from 'axios'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            user: localStorage.getItem('username')
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
                const allUsers = res.data
                this.setState({
                    res: allUsers,
                })
                console.log('User: ', res)
            }).catch(error => console.log(error))
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        //TODO handle submit post logic here
    }
    render() {
        return (
            <MainContainer>
                <Navbar user={this.state.user} />
                <h1>We are Home!! {this.state.user}</h1>
                <p>{this.state.res?.name}</p>
                <Button onClick={this.handleSubmit}>Submit Post</Button>
            </MainContainer>
        )
    }
}

export default Dashboard
