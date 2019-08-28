import * as types from './types'
export default(...args)=>{
    return {
        type:types.CALL_HISTORY_METHOD,
        payload:{
            method:'push',
            args
        }
    }
}