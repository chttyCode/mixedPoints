import React ,{Component} from 'react'
import ReactDOM from 'react-dom'
import * as types from '../store/action-types'
import {bindActionCreators} from '../redux'
import store from '../store'
import actions from '../store/actions/counter1'
import {connect} from '../react-redux'
import counter1 from '../store/reducers/counter1';
let boundActions = bindActionCreators(actions,store.dispatch)
class Counter1 extends Component{
    // constructor(props){
    //     super(props)
    //     this.state={number:store.getState().counter1.number}
    // }
    // componentDidMount(){
    //     this.unsubscribe=store.subScriber(()=>{
    //         this.setState({number:store.getState().counter1.number})
    //     })
    // }
    // componentWillUnmount(){
    //     this.unsubscribe()
    // }
    render(){
        return (
            <div>
                <p>counter1:{this.props.number}</p>
                {/* <button onClick={()=>boundActions.add(5)}>+</button> */}
                {/* <button onClick={()=>boundActions.actions.add(15)}>+</button> */}
                <button onClick={this.props.add}>+</button>
                <button onClick={()=>this.props.asyncAdd(10)}>Async+</button>
                <button onClick={this.props.minus}>-</button>
            </div>
        )
    }
}
let mapStateToProps = state=>state.counter1
// export default connect(Counter1,actions)


let mapDispatchToProps=(dispatch,ownProps)=>({
    add(number){
        return dispatch({type:types.ADD1,payload:ownProps.count})
    },
    minus(){
        return dispatch({type:types.MINUS1})
    }
})
export default connect(mapStateToProps,actions)(Counter1)