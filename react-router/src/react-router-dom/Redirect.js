import React from 'react'
import RouterContext from '../context'
export default class Redrect extends React.Component{
    static contextType = RouterContext
    render(){
        let {location} = this.context,{pathname='/'}=location
        console.log(this.props.from)
        console.log(pathname)
        console.log(this.props.from === pathname)
        if(!this.props.from ||this.props.from === pathname){
            this.context.history.push(this.props.to)
        }
       
        return null
    }
}