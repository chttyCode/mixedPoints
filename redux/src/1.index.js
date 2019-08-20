import React ,{Component} from 'react'
import ReactDOM from 'react-dom'
import Counter1 from './components/counter1'
import Counter2 from './components/counter2'
import {createStore,bindActionCreators} from './redux'
function reducer(state={number:0},action){
    switch(action.type){
        case 'ADD':return {number:state.number+(action.payload||1)};break;
        case 'MINUS':return {number:state.number-1};break;
        default:return state
    }
}
let store=createStore(reducer)

//bindActionCreators 即

//Action的创建者
let add=(number)=>{
    return {type:'ADD',payload:number}
}
let  minus=()=>{
    return {type:'MINUS'}
}


let actions = {
    add(number){
        return {type:'ADD',payload:number}
    },
    minus(){
        return {type:'MINUS'}
    }
}
//绑定 dispatch


// function bindActionCreators(actionCreators,dispatch){

//     function bindActionCreator(actionCreator,dispatch){
//         return (...args)=>dispatch(actionCreator(...args))
//     }
//     if(typeof actionCreators ==='function'){
//         return bindActionCreator(actionCreators,dispatch)
//     }
//     let boundActionCreators={}
//     for(let key in actionCreators){
//         boundActionCreators[key]=bindActionCreator(actionCreators[key],dispatch)
//     }
//     return boundActionCreators
// }

add = bindActionCreators(add,store.dispatch)
minus = bindActionCreators(minus,store.dispatch)


actions = bindActionCreators(actions,store.dispatch)



class Pannel extends Component{
    render(){
        return <p>HELLO</p>
    }
}
// function render(){
//     ReactDOM.render(<Counter />,document.getElementById('root'))
// }

// store.subScriber(render)

ReactDOM.render(<><Counter1 /><Counter2 /><Pannel /></>,document.getElementById('root'))