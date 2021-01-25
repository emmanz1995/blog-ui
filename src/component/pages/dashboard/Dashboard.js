import React, {Component} from 'react'
import Button from 'react-bootstrap/Button';
import { history } from "../../History";
import Navbar from '../../layout/navbar/Navbar';
import { MainContainer } from './DashboardStyled'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            user: localStorage.getItem('username')
        }
    }
    handleSubmit = (evt) => {
        evt.preventDefault();
        //TODO handle submit post logic here
    }
    render() {
        return (
            <MainContainer>
                <Navbar />
                <h1>We are Home!! {this.state.user}</h1>
                <Button onClick={this.handleSubmit}>Submit Post</Button>
            </MainContainer>
        )
    }
}

export default Dashboard
