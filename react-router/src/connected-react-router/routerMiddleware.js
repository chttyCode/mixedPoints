import * as types from './types'

export default function(history){
    return function({getState,dispatch}){
        return function(next){
            return function(action){
                if(action.type === types.CALL_HISTORY_METHOD){
                    console.log(action.payload.args)
                    history[action.payload.method].call(history,...action.payload.args)
                }else{
                    next(action)
                }
            }
        }
    }
}