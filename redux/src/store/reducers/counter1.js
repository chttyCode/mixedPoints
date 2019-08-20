import * as types from '../action-types'
let init={
    number:0
}
export default function(state=init,action){
    switch(action.type){
        case types.ADD1:
            return {number:state.number+(action.payload||1)}
        case types.MINUS1:
            return {number:state.number-1}
        default:
            return state
    }
}