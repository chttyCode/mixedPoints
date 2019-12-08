import { all } from '../../redux-saga/effects'
import counter from './counter'
import hello from './hello'
import read from './read'
import login from './login2'
import timer from './timer'
export default function* rootSaga() {
    yield all([hello(), counter(), read(), login(), timer()])
}
