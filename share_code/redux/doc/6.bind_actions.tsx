import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import { createStore } from './redux'
import * as types from './contants'
const initVal = {
    number: 0
}
function reducer(state: any = initVal, action: any) {
    switch (action.type) {
        case types.ADD:
            return state = { number: state.number + (action.payload || 1) }
        case types.MINUS:
            return state = { number: state.number - 1 }
        default:
            return state
    }
}

const store = createStore(reducer)

function add({payload=1}={}) {
    return { type: 'ADD' ,payload};
}
function minus() {
    return { type: 'MINUS' };
}
const actions = { add, minus };

function bindActionCreator(actionCreator: any, dispatch: any) {
    return (...args: any) => dispatch(actionCreator(...args))
}

const boundAdd = bindActionCreator(add, store.dispatch);//可以传一个函数

function bindActionCreators(actionCreators:any,dispatch:any){
    if(typeof actionCreators === 'function'){
        return bindActionCreator(actionCreators,dispatch)
    }
    Object.keys(actionCreators).forEach(key=>{
        actionCreators[key] = bindActionCreator(actionCreators[key],dispatch)
    })
    return actionCreators
}

const bindActions = bindActionCreators(actions,store.dispatch)

function Counter() {
    const [state, setstate] = useState(() => store.getState())
    useEffect(() => {
        let unsubscribe = store.subscribe(() => {
            setstate(() => store.getState())
        })
        return unsubscribe
    }, [])
    return <>
        <p>计算器</p>
        <p>{state.number}</p>
        <button onClick={() => { store.dispatch({ type: 'ADD' }) }}>原生dispatch+</button>
        <br />
        <button onClick={()=>boundAdd({payload:5})}>封装dispatch+</button>
        <br />
        <button onClick={bindActions.add}>bindActions+</button>
        <br />
        <button onClick={() => { store.dispatch({ type: 'MINUS' }) }}>-</button>
        <br />
        <button onClick={bindActions.minus}>bindActions -</button>
    </>
}

ReactDom.render(<Counter />, document.getElementById('root'))