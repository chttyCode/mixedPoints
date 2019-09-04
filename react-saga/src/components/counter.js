import React,{Component} from 'react'
import {connect} from 'react-redux'
import actions from '../store/actions'
 class Counter extends Component{
    render(){
        return (
            <>
             <p>{this.props.number}</p>
            <button onClick={this.props.add}>+</button>
            <button onClick={this.props.asyncAdd}>异步加+</button>
            <button onClick={this.props.stop}>停止</button>
            </>
           
        )
    }
}

export default connect(state=>state.counter,actions)(Counter)