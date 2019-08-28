import * as types from '../types'
import {push} from '../../connected-react-router'
export default{
    add(){
        return {type:types.ADD}
    },
    goto(path,state){
        return push(path,state)
    }
}