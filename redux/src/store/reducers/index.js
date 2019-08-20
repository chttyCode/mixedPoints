
import counter1 from './counter1'
import counter2 from './counter2'
import {combineReducers} from '../../redux'
/**
 * {
 *  counter1:{number:0}
 *  counter2:{number:1}
 * }
 * @param {*} state 
 * @param {*} action 
 */
// export default function(state={},action){
//     let nextState={}
//     nextState.counter1=counter1(state.counter1,action)
//     nextState.counter2=counter2(state.counter2,action)
//     return nextState
// }

// function combineReducers(reducers){
//     let reducersKeys = Object.keys(reducers)
//    return (state={},action)=>{
//        let nextState={},hasChange=false
//         for(let i=0;i<reducersKeys.length;i++){
//             let key = reducers[i]
//             let preState=state[key]
//             let reducer=reducers[key]
//             let nextState=reducer(preState,action)
//             hasChange=preState==nextState
//             hasChange = hasChange || preState!=nextState
//         }
//     return hasChange?nextState:state
//    }
// }

export default combineReducers({
    counter1,
    counter2
})