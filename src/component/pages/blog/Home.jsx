import React, { Component } from 'react'
import Navbar from '../../layout/navbar/Navbar'
// import DashboardDisplayPost from './DashboardDisplayPost'
import MainDisplayPost from './MainPostDisplay'

class Home extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <h1>Home</h1>
                <div style={{maxWidth: '1200px', margin: '0 auto'}}>
                    <MainDisplayPost />
                </div>
            </div>
        );
    }
}

export default Home
