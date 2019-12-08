import { all, take, put, call, fork, cancel } from '../../redux-saga/effects'
import * as types from '../types'
import Api from '../../fetch'

function* login(username: string, password: string) {
    try {
        const token = yield call(Api.login, username, password)
        yield put({
            type: types.SET_USERNAME,
            payload: {
                ...token
            }
        })
    } catch (error) {
        yield put({
            type: types.LOGIN_ERROR
        })
    } finally {
        if (yield cancelled()) {
            console.warn('error')
        }
    }
}
function* loginFlow() {
    while (true) {
        const value = yield take(types.LOGIN_REQUEST)
        const { username, password } = value.payload
        const task = yield fork(login, username, password)
        const action = yield take(types.LOGOUT)
        if (action.type === types.LOGOUT) {
            yield cancel(task)
        }
        yield put({
            type: types.SET_USERNAME
        })
    }
}

export default function* loginSaga() {
    yield all([loginFlow()])
}
