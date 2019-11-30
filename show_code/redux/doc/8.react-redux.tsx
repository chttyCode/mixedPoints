import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import { createStore, bindActionCreators, combineReducers } from './redux'
import * as types from './contants'
import { Provider, connect } from './react-redux'
const initVal = {
    number: 0
}
function reducer1(state: any = initVal, action: any) {
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


const reducer = combineReducers({ Counter1: reducer1, Counter2: reducer2 })

const store = createStore(reducer, { Counter1: { number: 0 }, Counter2: { number: 0 } })

const actions1 = {
    add({ payload = 1 } = {}) {
        return { type: types.ADD1, payload };
    },
    minus() {
        return { type: types.MINUS1 };
    }
};

const bindActions1 = bindActionCreators(actions1, store.dispatch)

function Counter1(props) {
    console.log('Counter1')
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
        <p>{props.number}</p>
        <br />
        <button onClick={bindActions1.add}>bindActions+</button>
        <button onClick={props.add}>props-bindActions+</button>
        <br />
        <button onClick={bindActions1.minus}>bindActions -</button>
        <button onClick={props.minus}>props-bindActions -</button>
    </>
}
Counter1 = connect(state => state.Counter1, actions1)(Counter1)

const actions2 = {
    add({ payload = 1 } = {}) {
        return { type: types.ADD2, payload };
    },
    minus() {
        return { type: types.MINUS2 };
    }
};
const bindActions2 = bindActionCreators(actions2, store.dispatch)
function Counter2(props) {
    console.log('Counter2')
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
        <p>{props.number}</p>
        <br />
        <button onClick={bindActions2.add}>bindActions -</button>
        <button onClick={props.add}>props-bindActions -</button>
        <button onClick={bindActions2.minus}>bindActions -</button>
        <button onClick={props.minus}>props-bindActions -</button>
    </>
}

Counter2 = connect(state => state.Counter2, actions2)(Counter2)

ReactDom.render(<Provider store={store}>
    <Counter1 />
    <Counter2 />
</Provider>, document.getElementById('root'))