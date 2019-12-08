import { createActions } from '../../redux-actions'
import * as types from '../types'
export default createActions({
    [types.ADD]: (payload: number) => {
        return payload * 5
    },
    [types.MINUS]: (payload: number) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(function(dispatch: any) {
                    dispatch({ type: types.MINUS, payload: payload * 5 })
                })
            }, 1000)
        })
    },
    [types.ADD_ASYNC]: () => {
        return new Promise((resolve) => {
            resolve({ type: types.ADD_ASYNC })
        })
    },
    [types.Read_ASYNC]: () => {
        return new Promise((resolve) => {
            resolve({ type: types.Read_ASYNC })
        })
    },
    login: (username: any, password: any) => {
        return { type: types.LOGIN_REQUEST, payload: { username, password } }
    },
    logout: () => {
        return { type: types.LOGOUT }
    },
    stop: () => {
        return { type: types.CANCEL_TASK }
    }
})
