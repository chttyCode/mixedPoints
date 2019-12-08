import { createStore, applyMiddleware } from '../redux'
import reducer from './reducer'
import { thunk, promise, logger } from '../middles'
import rootSaga from './sagas'
import createSagaMiddleware from '../redux-saga'
let sagaMiddleware = createSagaMiddleware()
let store = applyMiddleware([promise, sagaMiddleware, thunk, logger])(createStore)(reducer)
sagaMiddleware.run(rootSaga)
export default store
