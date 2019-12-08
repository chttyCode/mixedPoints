import { call, put, take, fork, cancel } from '../../redux-saga/effects'
import * as types from '../types'
import { delay } from '../../utils'
function* start() {
    while (true) {
        yield call(delay, 1000)
        yield put({ type: types.ADD })
    }
}
// function* recorder() {
//     yield race({
//         start: call(start),
//         stop: take(types.CANCEL_TASK)
//     })
// }

export default function* add() {
    console.warn('timer')
    const task = yield fork(start)
    console.warn(task)
    yield take(types.CANCEL_TASK)
    yield cancel(task)
}
// export default function* rootSaga() {
//     console.warn('timer')
//     yield add()
// }
