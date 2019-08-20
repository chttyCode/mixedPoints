import React ,{Component} from 'react'
import ReactDOM from 'react-dom'
import Counter1 from './components/counter1'
import Counter2 from './components/counter2'
import {Provider} from './react-redux'
import store from './store'
let oldDispatch=store.dispatch
// 重写dispatch方法 每次都要重写 多个串联
// store.dispatch=function(action){
//     console.log('老状态'+JSON.stringify(store.getState()))
//     oldDispatch(action)
//     console.log('新状态'+JSON.stringify(store.getState()))
// }
// store.dispatch=function(action){
//     setTimeout(()=>{
//         console.log('老状态'+JSON.stringify(store.getState()))
//         oldDispatch(action)
//         console.log('新状态'+JSON.stringify(store.getState()))
//     },1000)
  
// }
const logger=function({getState,dispatch}){
    return function(next){
        return (action)=>{
            console.log('老状态'+JSON.stringify(getState()))
            next(action)
            console.log('新状态'+JSON.stringify(getState()))
        }
    }
}

ReactDOM.render(
    <Provider store = {store}>
        <Counter1 count={10}/>
        <Counter2 />
    </Provider>
    ,document.getElementById('root'))