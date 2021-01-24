import React from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './component/pages/login/Login';
import Blog from './component/pages/blog/Blog';
import Post from './component/pages/blog/Post';
import AddNewPost from './component/pages/blog/AddNewPost';
import Dashboard from "./component/pages/dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/home/:userName" component={Dashboard} />
            <Route path="/blog" component={Blog} />
            <Route path="/post/:id" component={Post} />
            <Route path="/addpost" component={AddNewPost} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
