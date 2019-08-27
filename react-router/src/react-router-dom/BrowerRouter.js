import React, { Component } from "react";

import RouterContext from '../context'

export default class BrowerRouter extends Component{
    state={
        location:{
            pathname: '/',
            state:null
        }
    }
    componentWillMount(){
        (function(history){
            let oldPush=window.history.pushState
            window.history.pushState = function(state,title,path){
                oldPush.call(history,state,title,path)
                window.onpushstate&&window.onpushstate(state,path)
            }
        })(window.history)
        window.onpopstate=window.onpushstate=(state,path)=>{
            console.log(state,path)
            this.setState({
                location:{
                    ...this.state.location,
                    pathname:path||window.location.pathname,
                    state
                }
            })
        }
    }
    render(){
        let that=this
        let value={
            location:that.state.location,
            history:{
                push(to){
                    if(that.block){
                        let allow = window.confirm(that.block(that.state.location))
                        if(!allow)return
                    }
                    if(typeof to === 'object'){
                        let {pathname,state} = to
                        that.locationState=state
                        return window.history.pushState(state,null,pathname)
                    }
                    console.log(to)
                    window.history.pushState(null,null,to)
                },
                block(message){
                    that.block=message
                }
            }
        }
        return (
            <RouterContext.Provider value={value}>
                {this.props.children}
            </RouterContext.Provider>
        )
    }
}