import React, { Component } from "react";
import RouterContext from '../context'
import  pathToRegexp from  'path-to-regexp'
export default class Route extends Component{
    static contextType = RouterContext
    render(){
        let {path='/',component:Component,exact=false}=this.props,{location} = this.context
        let params=[]
        let reg=pathToRegexp(path,params,{end:exact})
        let result = location.pathname.match(reg)
        if(result){
            return <Component />
        }
        return null
    }
}