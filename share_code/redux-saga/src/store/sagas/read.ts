//cps
import { all, put, takeEvery, cps } from '../../redux-saga/effects'
import { read } from '../../utils'
export function* doRead() {
    let content = yield cps(read, '1.txt') //cps(fn, ...args)
    yield put({ type: 'Read', payload: content })
}
//cps nodeJsf风格的调用
export function* watchReadAsync() {
    yield takeEvery('Read_ASYNC', doRead)
}

export default function* readSaga() {
    yield all([watchReadAsync()])
}
