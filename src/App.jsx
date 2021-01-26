import React from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './component/pages/login/Login';
import Blog from './component/pages/blog/Blog';
import Post from './component/pages/blog/Post';
import AddNewPost from './component/pages/blog/AddNewPost';
import Dashboard from "./component/pages/dashboard/Dashboard";
import { PrivateRoute } from './component/PrivateRoute'
import {withAlert} from 'react-alert'
import {history} from "./component/History";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Router history={history}>
                    <Switch>
                        <Route exact path="/" component = {props => <Login {...props} alert={this.props.alert} />} />
                        <PrivateRoute path="/dashboard/:userName" component={Dashboard} />
                        <Route path="/blog" component={Blog} />
                        <Route path="/post/:id" component={Post} />
                        <Route path="/addpost" component={AddNewPost} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default withAlert()(App);
