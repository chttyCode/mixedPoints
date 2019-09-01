import * as types from '../types'
let init ={number:0}
export default (state=init,action)=>{
    switch(action.type){
        case types.ADD:
            return {...state,number:state.number+(action.payload||1)}
        default:
        return state
    }
}