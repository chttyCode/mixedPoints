// self saga
import {apply,select} from 'redux-saga/effects'
import {take,put,fork,delay,takeEvery,call,cps,all,cancel} from '../redux-saga/effects'

import * as types from './types'
function* add(){
    while(true){
        yield delay(1000)
        yield put({type:types.ADD})
    }
}
export default function* rootSaga(){//入口saga
    const task = yield fork(add)
    yield take(types.STOP)
    yield cancel(task)
}