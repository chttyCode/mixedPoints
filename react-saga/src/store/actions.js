import * as types from './types'
export default {
    add(){
        console.log('add')
        return {type:types.ADD}
    },
    asyncAdd(){
        console.log('async action')
        return {type:types.ASYNCADD}
    }
}