import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import { createStore ,bindActionCreators} from './redux'
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

const boundAdd =  bindActionCreators(add,store.dispatch)

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
        <button onClick={()=>boundAdd({payload:5})}>bindfunction+</button>
        <br />
        <button onClick={bindActions.add}>bindActions+</button>
        <br />
        <button onClick={() => { store.dispatch({ type: 'MINUS' }) }}>-</button>
        <br />
        <button onClick={bindActions.minus}>bindActions -</button>
    </>
}

ReactDom.render(<Counter />, document.getElementById('root'))