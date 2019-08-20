import * as types from '../action-types'
export default {
    add(number){
        return {type:types.ADD1}
    },
    asyncAdd(number){
        return function(dispatch){
            setTimeout(()=>{
                dispatch({type:types.ADD1,payload:number||1})
            },1000)
        }
    },
    minus(){
        return {type:types.MINUS1}
    }
}