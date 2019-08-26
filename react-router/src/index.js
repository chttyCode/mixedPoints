import React, { Component } from "react";
import ReactDOM from 'react-dom'
import {HashRouter as Router,Route,Link,Switch,Redirect} from './react-router-dom'
import {Home,User,Profile} from './components'

ReactDOM.render((<Router>
    <Link to="/">Home</Link>
    <Link to="/profile">Profile</Link>
    <Link to="/user">user</Link>
    <Switch>
        <Route path = '/' exact component = {Home}></Route>
        <Route path = '/profile' component = {Profile} ></Route>
        <Route path = '/user' component = {User} ></Route>
        <Redirect from = '/xxx' to = '/'/>
    </Switch>

</Router>),document.getElementById('root'))