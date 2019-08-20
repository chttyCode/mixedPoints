import {createStore,combineReducers} from '../redux'
import reducers from './reducers'

// store.dispatch=function(action){
//     console.log('老状态'+JSON.stringify(store.getState()))
//     oldDispatch(action)
//     console.log('新状态'+JSON.stringify(store.getState()))
// }

function applyMiddleWare(...middlewares){
    return function(createStore){
        return function(...args){
            let store = createStore(...args)
            let dispatch,
            middlewareApi={getState:store.getState,dispatch:(...args)=>dispatch(...args)}
            let chain = middlewares.map(middleware=>middleware(middlewareApi))
            dispatch=compose(...chain)(store.dispatch)
            return {
                ...store,
                dispatch
            }
        }
    }
}
// function applyMiddleWare(middleware){
//     return function(createStore){
//         return function(reducers){
//             let store = createStore(reducers)
//             let dispatch
//             middleware=middleware({getState:store.getState,dispatch:(...args)=>dispatch(...args)})
//             dispatch = middleware(store.dispatch)
//             return {
//                 ...store,
//                 dispatch
//             }
//         }
//     }
// }
function thunk({getState,dispatch}){
    return function(next){
        return (action)=>{
            if(typeof action === 'function'){
                return action(dispatch)
            }
            next(action)
        }
    }
}
const logger=function({getState,dispatch}){
    //getState 获取状态 dispatch发起动作
    return function(next){ //next 调用真正的dispatch
        return (action)=>{
            console.log('老状态'+JSON.stringify(getState()))
            next(action)
            console.log('新状态'+JSON.stringify(getState()))
        }
    }
}
function compose(...fns){
    return fns.reduce((a,b)=>(...args)=>a(b(...args)))
}
// let store=createStore(reducers)
let store=applyMiddleWare(thunk,logger)(createStore)(reducers)
console.log(store.dispatch)
window.store=store
export default store