import React from 'react'
import { connect } from '../react-redux'
import actions from '../store/actions'
function Counter(props: any) {
    return (
        <div>
            <p>{props.number}</p>
            <p>{props.read}</p>
            <button onClick={props.ADD}>+</button>
            <button onClick={props.ADD_ASYNC}>ASYNC+</button>
            <button onClick={props.stop}>stop+</button>
            <button onClick={props.Read_ASYNC}>Read+</button>
        </div>
    )
}
export default connect((state: any) => state.counter, actions)(Counter)
