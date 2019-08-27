import React, { Component } from "react";
import ReactDOM from 'react-dom'
import {BroserRouter as Router,Route,Link,Switch,Redirect} from './react-router-dom'
import {Home,User,Profile,Authorized,Nav} from './components'
ReactDOM.render((<Router>
    <Nav />
    <Link to="/profile">Profile</Link>
    <Link to="/user">user</Link>
    <Switch>
        <Route path = '/' exact component = {Home}></Route>
        {/* <Authorized path = '/profile' component = {Profile} /> */}
        <Route path = '/profile' component = {Profile} ></Route>
        <Route path = '/user' component = {User} ></Route>
        {/* <Route path = '/user/:id' component = {User} ></Route> */}
        <Redirect from = '/xxx' to = '/'/>
    </Switch>

</Router>),document.getElementById('root'))