// self saga
import {takeEvery,call,apply,all,select} from 'redux-saga/effects'
import {take,put} from '../redux-saga/effects'

import * as types from './types'

export function* add(){

}

function* watchLog(){
    console.log('logger')
    while(true){
        let action = yield take('*')
        console.log(action)
        let state = yield select(state=>state.counter)
        console.log(state)
    }
}

function* watchAsyncAdd(){
    console.log('开始执行')
    for (let i =0;i<3;i++){
        let action = yield take(types.ASYNCADD)
        console.log(action)
        yield put({type:types.ADD})
    }

}

function * printLog(){

}
export default function * rootSaga(){
    console.log('开始执行')
    for (let i =0;i<3;i++){
        let action = yield take(types.ASYNCADD)
        console.log(action)
        yield put({type:types.ADD})
    }
    alert('最多执行3次')
}
// export default function* rootSaga(){
//     // yield takeEvery(types.ASYNCADD,add)
//     yield all([
//         watchLog(),
//         watchAsyncAdd()
//     ])
// }