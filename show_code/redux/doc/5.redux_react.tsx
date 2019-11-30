import React, { useState , useEffect } from 'react'
import ReactDom from 'react-dom'
import { createStore } from './redux'
import * as types from './contants'
const initVal = {
    number: 0
}
function reducer(state: any = initVal, action: any) {
    switch (action.type) {
        case types.ADD:
            return state = { number: state.number + 1 }
        case types.MINUS:
            return state = { number: state.number - 1 }
        default:
            return state
    }
}

const store = createStore(reducer)

function Counter() {
    const [state, setstate] = useState(() => store.getState())
    useEffect(()=>{
        let unsubscribe = store.subscribe(()=>{
            setstate(()=> store.getState())
        })
        return unsubscribe
    },[])
    return <>
        <p>计算器</p>
        <p>{state.number}</p>
        <button onClick={()=>{store.dispatch({type:'ADD'})}}>点我</button>
    </>
}

ReactDom.render(<Counter />, document.getElementById('root'))