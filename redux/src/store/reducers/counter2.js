import * as types from '../action-types'
let init={
    number:1
}
export default function(state=init,action){
    switch(action.type){
        case types.ADD2:
            return {number:state.number+2}
        case types.MINUS2:
            return {number:state.number-2}
        default:
            return state
    }
}