import React,{useReducer} from 'react';
const count = 0;

function reducer(state:any, action:any) {
  switch (action.type) {
    case 'ADD':
      return {...state,number: state.number + 1};
    case 'MINUS':
      return {...state,number: state.number - 1};
    default:
      throw new Error();
  }
}
function init(number:number){
    return {number,echart:{nowx:[1,2,3,4,5,6,7,8,9]}};
}
export default function Counter(){
    const [state, dispatch] = useReducer(reducer,count,init);
    return (
        <>
          Count: {state.number }
          nowx: {state.echart.nowx.join('--')}
          <button onClick={() => dispatch({type: 'ADD'})}>+</button>
          <button onClick={() => dispatch({type: 'MINUS'})}>-</button>
        </>
    )
}