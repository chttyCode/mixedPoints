import React ,{Component} from 'react'
import ReactDOM from 'react-dom'
import {bindActionCreators} from '../redux'
import store from '../store'
import actions from '../store/actions/counter2'
import {connect} from '../react-redux'
let boundActions = bindActionCreators(actions,store.dispatch)
class Counter2 extends Component{
    // constructor(props){
    //     super(props)
    //     this.state={number:store.getState().counter2.number}
    // }
    // componentDidMount(){
    //     this.unsubscribe=store.subScriber(()=>{
    //         this.setState({number:store.getState().counter2.number})
    //     })
    // }
    // componentWillUnmount(){
    //     this.unsubscribe()
    // }
    render(){
        return (
            <div>
                <p>counter2:{this.props.number}</p>
                <button onClick={()=>this.props.add(5)}>+</button>
                <button onClick={()=>this.props.add(15)}>+</button>
                <button onClick={this.props.minus}>-</button>
            </div>
        )
    }
}
// export default connect(Counter2)
let mapStateToProps = state=>state.counter2
export default connect(mapStateToProps,actions)(Counter2)