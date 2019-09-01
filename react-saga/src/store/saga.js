import {all,takeEvery,put,call,cps} from 'redux-saga/effects'
// import {all,takeEvery,delay,put} from 'redux-saga/effects'
import * as types from './types'
import {readFile} from '../utils'
import watchEffectAdd from './effects'
export function delay(ms){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            // resolve('ok')
            let result = Math.random()
            if(result>0.5){
                resolve('ok')
            }else{
                reject('发生错误')
            }
        },ms)
    })
}

export function* helloSaga(){
    console.log('hello')
}
export function* addAsync(){
    console.log('async add ')
    // let ms = yield delay(1000)
    try{
        let ms = yield call(delay,1000)
        console.log(ms)
        yield put({type:types.ADD})
    }catch(err){
        console.error(err)
    }
 
}

export function* watchAsyncAdd(){//监听动作，执行worker saga
    console.log('watchAsyncAdd')
    yield takeEvery(types.ASYNCADD,addAsync) //监听 types.ASYNCADD 动作
}

export function* readAsync(){
    let content = yield cps(readFile,'Readme.md')
    console.log(content)
}

export default function* rootSaga(){//入口saga
    yield all([
        helloSaga(),
        // watchAsyncAdd(),
        readAsync(),
        watchEffectAdd()
    ])
}



