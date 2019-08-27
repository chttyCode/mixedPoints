import React, { Component } from "react";
import ReactDOM from 'react-dom'
import {Route,Redirect} from '../react-router-dom'

export default class Auth extends Component {
    render(){
        let {path,component:Component} = this.props
        return (
            <Route path={path}  render={props=>{
                //授权判断
            let auth=false
            return auth?<Component />:<Redirect to ={{pathname:'/login',state:{from:props.location.pathname}}} />
            }} ></Route>
        )
    }
}