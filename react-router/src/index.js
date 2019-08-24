import React, { Component } from "react";
import ReactDOM from 'react-dom'
import {HashRouter as Router,Route} from './react-router-dom'
import {Home,User,Profile} from './components'


ReactDOM.render((<Router>
    <Route path = '/' exact component = {Home}></Route>
    <Route path = '/profile' component = {Profile} ></Route>
    <Route path = '/user' component = {User} ></Route>
</Router>),document.getElementById('root'))