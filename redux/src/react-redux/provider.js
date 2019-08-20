import React ,{Component} from 'react'
import ReactDOM from 'react-dom'
import {bindActionCreators} from '../redux'
import store from '../store'
import reactReduxContext from './context'

export default class Provider extends Component{
    render(){
        return (
            <reactReduxContext.Provider value={{store:this.props.store}}>
                {this.props.children}
            </reactReduxContext.Provider> 
        )
    }
}