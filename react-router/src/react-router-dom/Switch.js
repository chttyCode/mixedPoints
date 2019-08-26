import React from 'react'
import RouterContext from '../context'
let  pathToRegexp = require("path-to-regexp")
export default class Switch extends React.Component{
    static contextType = RouterContext
    render(){
        let childArray=Array.isArray(this.props.children)?this.props.children:[this.props.children]
        let pathName=this.context.location.pathname
        for (let i=0;i<childArray.length;i++){
            let child = childArray[i]
            let {path='/',exact=false,component:Component}=child.props
            let parms=[],reg=pathToRegexp(path,parms,{end:exact})
            let result = pathName.match(reg)
            if(result){
                return child
            }
        }
        return null
    }
}