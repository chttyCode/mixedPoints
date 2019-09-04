// self saga
import {apply,select} from 'redux-saga/effects'
import {take,put,takeEvery,call,cps,all} from '../redux-saga/effects'

import * as types from './types'


// function* watchLog(){
//     console.log('logger')
//     while(true){
//         let action = yield take('*')
//         console.log(action)
//         let state = yield select(state=>state.counter)
//         console.log(state)
//     }
// }

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
// function delay(ms){
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             resolve(ms)
//         },ms)
//     })
// }
function delay(ms,callback){
    setTimeout(()=>{
        callback(ms)
    },ms)
}
function* add(){
    // let result = yield call(delay,1000)
    // let result = yield delay(1000)
    console.log('first next')
    let result = yield cps(delay,1000)
    console.log(result)
    yield put({type:types.ADD})
    console.log('go2')
}
export  function * firstTake(){
    console.log('开始执行')
    for (let i =0;i<3;i++){
        let action = yield take(types.ASYNCADD)
        console.log(action)
        yield add()
        console.log('go')
    }
    alert('最多执行3次')
}
// export default function* second(){
//     yield takeEvery(types.ASYNCADD,add)
// }
export  function* second(){
    yield takeEvery(types.ASYNCADD,add)
    console.log('add over')
}
function* logger(){
    console.log('logger')
}
function* watchLog(){
    yield takeEvery('*',logger)
    console.log('logger over')
}
export default function* rootSaga(){//入口saga
    yield all([
        watchLog(),
        second()
    ])
    console.log('all over')
}