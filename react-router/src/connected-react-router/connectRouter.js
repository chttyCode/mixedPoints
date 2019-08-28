import * as types from './types'
export default function(history){
    let init={}
    return function(state=init,action){
        //     type:types.LOCATION_CHANG,
        if(action.type === types.LOCATION_CHANG){
            return action.payload
        }
        return state
    }
}