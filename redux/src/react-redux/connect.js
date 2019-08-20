import React ,{Component} from 'react'
import reactReduxContext from './context'
import store from '../store'
import {bindActionCreators} from '../redux'
export default function(mapStateToProps,actions={}){
    return function(WrappedComponent){
        return class WrapComponent extends Component{
            static contextType = reactReduxContext
            constructor(props,context){
                super(props)
                this.state=mapStateToProps(context.store.getState())
                this.ownProps=props
                console.log(typeof actions == 'function')
                if(typeof actions == 'function'){
                    this.boundActions= actions(context.store.dispatch,props)
                }else{
                    this.boundActions = bindActionCreators(actions,context.store.dispatch)
                }
            }
            componentDidMount(){
                this.unsubscribe=this.context.store.subScriber(()=>{
                    this.setState(mapStateToProps(this.context.store.getState()))
                })
            }
            componentWillUnmount(){
                this.unsubscribe()
            }
            render(){
                return <WrappedComponent {...this.state} {...this.ownProps} {...this.boundActions }/>
            }
        }
    }
}