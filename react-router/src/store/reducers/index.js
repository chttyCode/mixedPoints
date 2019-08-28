import {combineReducers} from 'redux'

import counter from './counter'
import {connectRouter} from '../../connected-react-router'
import history from '../../connected-react-router/history'
let reducer = combineReducers({
    counter,
    router:connectRouter(history)
})
export default reducer