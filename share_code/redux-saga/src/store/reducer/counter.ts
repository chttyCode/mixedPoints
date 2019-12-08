import { handleActions } from '../../redux-actions'
import * as types from '../types'

export default handleActions(
    {
        [types.ADD]: (state: any, action: any) => {
            return { ...state, number: state.number + (action.payload || 1) }
        },
        [types.MINUS]: (state: any, action: any) => {
            return { ...state, number: state.number - (action.payload || 1) }
        },
        [types.Read]: (state: any, action: any) => {
            return { ...state, read: action.payload || 'not content' }
        }
    },
    { number: 0 }
)
