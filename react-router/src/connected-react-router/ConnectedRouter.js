import React from 'react'
import {BroserRouter as Router} from '../react-router-dom'
import * as types from './types'
import {ReactReduxContext} from 'react-redux'

export default class ConnectedRouter extends React.Component{
    static contextType = ReactReduxContext
    componentDidMount(){
        this.unlisten=this.props.history.listen((loaction,action)=>{
            this.context.store.dispatch({
                type:types.LOCATION_CHANG,
                payload:{loaction,action}
            })
        })
    }
    componentWillUnmount(){
        this.unlisten()
    }
    render(){
        return(
            <Router history={this.props.history}>
                {this.props.children}
            </Router>
        )
    }
}   