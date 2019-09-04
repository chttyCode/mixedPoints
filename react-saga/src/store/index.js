import {createStore,applyMiddleware} from 'redux'
import reducers from './reducers'
// import createSagaMiddleware from 'redux-saga'
import createSagaMiddleware from '../redux-saga'
// import rootSaga from './saga'
// import rootSaga from './effects'
// import rootSaga from './effects2'//self saga
import rootSaga from './cancelsaga'//self saga
let sagaMiddleware = createSagaMiddleware()
let store=applyMiddleware(sagaMiddleware)(createStore)(reducers)
sagaMiddleware.run(rootSaga)
export default store