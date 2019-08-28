import React from 'react'
import {connect} from 'react-redux'
import actions from '../store/actions/counter'
class Counter extends React.Component{
    render(){
        return (
            <>
                <p>{this.props.number}</p>
                <button onClick={this.props.add}>+</button>
                <button onClick={()=>this.props.goto('/')}>跳到首页</button>
            </>
        )
    }
}

export default connect(state=>state.counter,actions)(Counter)