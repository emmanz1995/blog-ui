import React, { Component } from 'react'
import Navbar from '../../layout/navbar/Navbar'
import DisplayPost from './DisplayPost'

class Home extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <h1>Home</h1>
                <DisplayPost />
            </div>
        );
    }
}

export default Home
