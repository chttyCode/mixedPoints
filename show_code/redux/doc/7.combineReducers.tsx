import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import { createStore ,bindActionCreators,combineReducers} from './redux'
import * as types from './contants'
const initVal = {
    number: 0
}
function reducer1(state: any = initVal, action: any) {
    console.log(state)
    switch (action.type) {
        case types.ADD1:
            return state = { number: state.number + (action.payload || 1) }
        case types.MINUS1:
            return state = { number: state.number - 1 }
        default:
            return state
    }
}
function reducer2(state: any = initVal, action: any) {
    switch (action.type) {
        case types.ADD2:
            return state = { number: state.number + (action.payload || 1) }
        case types.MINUS2:
            return state = { number: state.number - 1 }
        default:
            return state
    }
}


const reducer = combineReducers({Counter1:reducer1,Counter2:reducer2})

const store = createStore(reducer,{Counter1:{number:0},Counter2:{number:0}})

const actions1 = { 
    add({payload=1}={}) {
        return { type:types.ADD1 ,payload};
    },
    minus() {
        return { type:types.MINUS1 };
    }
 };

const bindActions1 = bindActionCreators(actions1,store.dispatch)

function Counter1() {
    const [state, setstate] = useState(() => store.getState().Counter1)
    useEffect(() => {
        let unsubscribe = store.subscribe(() => {
            setstate(() => store.getState().Counter1)
        })
        return unsubscribe
    }, [])
    return <>
        <p>Counter1</p>
        <p>{state.number}</p>
        <br />
        <button onClick={bindActions1.add}>bindActions+</button>
        <br />
        <button onClick={bindActions1.minus}>bindActions -</button>
    </>
}

const actions2 = { 
    add({payload=1}={}) {
        return { type:types.ADD2 ,payload};
    },
    minus() {
        return { type:types.MINUS2 };
    }
 };
const bindActions2 = bindActionCreators(actions2,store.dispatch)
function Counter2() {
    const [state, setstate] = useState(() => store.getState().Counter2)
    useEffect(() => {
        let unsubscribe = store.subscribe(() => {
            setstate(() => store.getState().Counter2)
        })
        return unsubscribe
    }, [])
    return <>
        <p>Counter2</p>
        <p>{state.number}</p>
        <br />
        <button onClick={bindActions2.add}>bindActions -</button>
        <button onClick={bindActions2.minus}>bindActions -</button>
    </>
}

ReactDom.render(<>
    <Counter1 />
    <Counter2 />
</>, document.getElementById('root'))