import React from 'react'
import {createBrowserHistory} from 'history'
import createLoading from 'dva-loading'
// import dva,{connect}from 'dva'
// import {Router,Route,Link,routerRedux} from 'dva/router'
import {Router,Route,Link,routerRedux} from './dva/router'
import dva,{connect}from './dva'

const SHOW = 'SHOW',HIDE='HIDE'
let initialLoadingState = {
    global:false,
    effects:{},
    models:{}
}
let app  = dva({
    history:createBrowserHistory(),
    initialState:{counter:{number:5}},
    onError:(err)=>{
        console.error(err)
    },
    onAction:logger,
    onStateChange:state=>console.log('onStateChange'),
    onReducer:reduer=>(state,action)=>{//对reducer的封装
        console.log('准备执行reducer')
        return reduer(state,action)
    },
    extraEnhancers:[createStore=>{
        return createStore
    }],
    onEffect:(effect,{put},model,actionType)=>{
        const {namespace}=model
        return function* (...args){
            yield put({type:SHOW,payload:{namespace,actionType}})
            yield effect(...args)
            yield put({type:HIDE,payload:{namespace,actionType}})
        }
    },
    extraReducers:{
        loading(state = initialLoadingState,{type,payload:{namespace,actionType}={}}){
            switch(type){
                case SHOW:
                    return {
                        global:true,
                        models:{
                            ...state.models,
                            [namespace]:true
                        },
                        effects:{
                            ...state.effects,
                            [`${namespace}/${actionType}`]:true
                        }
                    }
                case HIDE:
                    let effects={
                        ...state.effects,
                        [`${namespace}/${actionType}`]:false
                    }
                    let modelStatus = Object.keys(effects).filter(item=>item.startsWith(namespace+'/')).some(item=>effects[item])
                    let models = {
                        ...state.models,
                        [namespace]:modelStatus
                    }
                    let global=Object.keys(models).some(namespace=>models[namespace])

                    return {
                        global,
                        models,
                        effects
                    }
                default:
                    return state
            }
        }
    }
})
// app.use(createLoading())
function logger({getState,dispatch}){
    return (next)=>{
        return(action)=>{
            console.log('老状态',getState())
            next(action)
            console.log('新状态',getState())
        }
    }
}
function delay(ms){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('ok')
        },ms)
    },ms)
}
app.model({
    namespace:'counter',
    state:{number:0},
    reducers:{
        add(state){
            return {number:state.number+1}
        },
    },
    effects:{
        *asyncadd(action,{call,put}){
            yield call(delay,5000)
            yield put({type:'counter/add'})
            // yield put({type:'add'})
        },
        *goto(action,{call,put}){ew
            let {payload:{pathname}}=action
            yield put(routerRedux.push(pathname))
        }
    }
})
const Counter=connect(state=>state.counter)(
    props=>(
        <>
            <p>{props.number}</p>
            <button onClick={()=>props.dispatch({type:'counter/add'})}>+</button>
            <button onClick={()=>props.dispatch({type:'counter/asyncadd'})}>+</button>
            <button onClick={()=>props.dispatch({type:'counter/goto',payload:{pathname:'/'}})}>跳转到首页</button>
        </>
    )
)
const Home = ()=><div>首页</div>
app.router(({history})=>(
    <Router history={history}>
      <>
        <Link to='/'>首页</Link>
        <Link to ='/counter'>计数器</Link>
        <Route path = '/' exact component={Home}></Route>
        <Route path = '/counter' component={Counter}></Route>
      </>
    </Router>
))
app.start('#root')
window.getState=app._store.getState