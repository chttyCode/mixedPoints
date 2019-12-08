import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from './react-redux'
import Home from './containers/home'
import Counter from './containers/counter'
import Login from './containers/login'
import store from './store'

ReactDom.render(
    <Provider store={store}>
        <Home />
        <Counter />
        <Login />
    </Provider>,
    document.getElementById('root')
)
