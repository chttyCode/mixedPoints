import React ,{useContext} from 'react'
import numberContext from '../components/context'
export default function Counter(){
    let {state,dispatch} = useContext(numberContext);
    return (
        <>
          <p>{state.num}</p>
          <button onClick={() => dispatch({type: 'ADD'})}>+</button>
          <button onClick={() => dispatch({type: 'MINUS'})}>-</button>
        </>
    )
  }