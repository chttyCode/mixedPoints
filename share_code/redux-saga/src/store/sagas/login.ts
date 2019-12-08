import { all, take, put, call } from '../../redux-saga/effects'
import * as types from '../types'
import Api from '../../fetch'

function* login(username: string, password: string) {
    try {
        const token = yield call(Api.login, username, password)
        return token
    } catch (error) {
        yield put({
            type: types.LOGIN_ERROR
        })
    }
}

function* loginFlow() {
    while (true) {
        const value = yield take(types.LOGIN_REQUEST)
        const { username, password } = value.payload
        const token = yield call(login, username, password)
        if (token) {
            yield put({
                type: types.SET_USERNAME,
                payload: {
                    username,
                    password
                }
            })
            yield take(types.LOGOUT)
            yield put({
                type: types.SET_USERNAME,
                username: null
            })
        }
    }
}

export default function* loginSaga() {
    yield all([loginFlow()])
}
