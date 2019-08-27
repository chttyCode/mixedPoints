import React, { Component } from "react";
import RouterContext from '../context'
import  pathToRegexp from  'path-to-regexp'
export default class Route extends Component{
    static contextType = RouterContext
    render(){
        let {path='/',component:Component,exact=false,render}=this.props,{location} = this.context
        let params=[]
        let reg=pathToRegexp(path,params,{end:exact})
        let result = location.pathname.match(reg)
        let props={
            history:this.context.history,
            location:this.context.location
        }
        if(result){
            let [url,...values]=result
            params=params.map(item=>item.name)
            let v = values.reduce((memo,value,index)=>{
                 memo[params[index]] = value
                 return  memo
            },{})
            let match={
                path,
                url,
                params:v,
                exact
            }
            console.log(v)
            props.match=match
            if(Component){
                return <Component {...props}/>
            }else if(render){
                return render(props)
            }
            
        }
        return null
    }
}