import React from 'react'
import actions from '../store/actions'
import { connect } from '../react-redux'
function Home(props: any) {
    return (
        <>
            <p>welcome Home</p>
            <button onClick={props.stop}>+</button>
        </>
    )
}

export default connect((state: any) => state, actions)(Home)
