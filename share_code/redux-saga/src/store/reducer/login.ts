import { handleActions } from '../../redux-actions'
import * as types from '../types'

export default handleActions(
    {
        [types.LOGIN_SUCCESS]: (state: any, action: any) => {
            let { username, password } = (action.payload || {}) as any
            return { ...state, username, password }
        },
        [types.SET_USERNAME]: (state: any, action: any) => {
            let { username, password } = (action.payload || {}) as any
            return { ...state, username, password }
        },
        [types.LOGIN_ERROR]: (state: any) => {
            return { ...state, username: '', password: '' }
        },
        [types.LOGOUT]: (state: any) => {
            return { ...state, username: '', password: '' }
        }
    },
    { username: '', password: '' }
)
