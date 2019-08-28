import React, { Component } from "react";
import ReactDOM from 'react-dom'
import {BroserRouter as Router,Route,Link,Switch,Redirect} from './react-router-dom'
import {Home,User,Profile,Authorized,Nav,Counter} from './components'
import {Provider} from 'react-redux'
import {ConnectedRouter,push} from './connected-react-router'
import history from './connected-react-router/history'
import store from './store'
ReactDOM.render((
<Provider store={store}>
<ConnectedRouter history={history}>
    <Nav />
    <Link to="/profile">Profile</Link>
    <Link to="/user">user</Link>
    <Link to="/counter">counter</Link>
    <Switch>
        <Route path = '/' exact component = {Home}></Route>
        {/* <Authorized path = '/profile' component = {Profile} /> */}
        <Route path = '/profile' component = {Profile} ></Route>
        <Route path = '/user' component = {User} ></Route>
        <Route path = '/counter' component = {Counter} ></Route>
        {/* <Route path = '/user/:id' component = {User} ></Route> */}
        <Redirect from = '/xxx' to = '/'/>
    </Switch>
</ConnectedRouter>
</Provider>),document.getElementById('root'))