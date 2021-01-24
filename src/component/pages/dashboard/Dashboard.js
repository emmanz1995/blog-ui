import React, {Component} from 'react'
import Button from 'react-bootstrap/Button';
import {history} from "../../History";
import Navbar from '../../layout/navbar/Navbar';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.handlelogout = this.handlelogout.bind(this);
        this.state = {
            user: localStorage.getItem('username')
        }
    }
    handlelogout = (evt) => {
        evt.preventDefault();
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        history.push("/");
    }
    render() {
        return (
            <div>
                <Navbar />
                <h1>We are Home!! {this.state.user}</h1>
                <Button onClick={this.handlelogout}>
                    Logout
                </Button>
            </div>
        )
    }
}

export default Dashboard
