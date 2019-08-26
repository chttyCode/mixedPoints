import React from 'react'
import RouterContext from '../context'
export default class Link extends React.Component{
    static contextType = RouterContext
    render(){
        return(
            <a onClick={(e)=>{
                e.preventDefault()
                this.context.history.push(this.props.to)
            }} href={`#${this.props.to}`}>{this.props.children}</a>
        )
    }
}