import { put, takeEvery, call, all, take } from '../../redux-saga/effects'
// import { apply, all, put, take } from 'redux-saga/effects'
import { delay } from '../../utils'
import * as types from '../types'
// export function* add() {
//     // yield call(delay, 3000) //call(fn, ...args)
//     // yield call([{ a: 1 }, delay], 3000) //call([context,fn], ...args) 传递上下文
//     // yield apply(delay, 3000) //call([context,fn], ...args) 传递上下文
//     // yield apply({ a: 1 }, delay, [3000]) //带上下文
//     yield apply(null, delay, [3000]) //带上下文
//     yield put({ type: 'ADD' })
// }
//cps nodeJsf风格的调用
// export function* watchAddAsync() {
//     yield takeEvery('ADD_ASYNC', add)
// }
function* add() {
    // const result = yield delay(1000)
    const result = yield call(delay, 1000)
    console.warn(result)
    yield put({ type: types.ADD })
}
function* watchAddAsync() {
    // console.warn('ADD')
    // for (let i = 0; i < 3; i++) {
    //     const action = yield take(types.ADD_ASYNC)
    //     console.warn(action, 'saga')
    //     yield add()
    // }
    // alert('监听3次')
    yield takeEvery(types.ADD_ASYNC, add)
}
function* watchLog() {
    console.warn('action watch')
    while (true) {
        let action = yield take('*')
        console.warn('action', action)
    }
}
export default function* rootSaga() {
    yield all([watchAddAsync(), watchLog()])
}
