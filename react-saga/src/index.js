import React from 'react';
import ReactDOM from 'react-dom';
import store from './store'
import {Provider} from 'react-redux'
import Counter from './components/counter'
class App extends React.Component{
    render(){
        return (
            <Provider store={store}>
             <Counter />
            <p>Hello</p>
            </Provider>
           
        )
    }
}
ReactDOM.render(<App />, document.getElementById('root'));
