import React from 'react'
import {combineReducers,createStore,applyMiddleware} from 'redux'
import {Provider,connect} from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import * as sagaEffects from 'redux-saga/effects'
import {createHashHistory} from 'history'
import {
    routerMiddleware,
    connectRouter,//创建router reducer
    connectedRouter//取代Router
} from 'connected-react-router'
import ReactDOM from 'react-dom'
import { ConnectedRouter } from 'connected-react-router';
export {connect}
export default function(options){

    const app={
        _models:[],//存放定义函数
        _router:null,//存放路由定义的函数
        model,
        router,
        start
    }
    function model(model){
        app._models.push(model)
    }
    function router(routerConfig){
        app._router=routerConfig
    }
    function start(containerId){
        //构建store
        let history=options.history||createHashHistory()
        let reducers={
            router:connectRouter(history)
        }
        if(options.extraReducers){
            reducers = { ...reducers,...options.extraReducers}
        }
        for(let i=0;i<app._models.length;i++){
            let model = app._models[i]
            reducers[model.namespace] = function(state=model.state,action){
                let actionType = action.type
                let [namespace,type]=actionType.split('/')
                if(namespace ===  model.namespace){
                    let reducer = model.reducers[type]
                    if(reducer){
                        return reducer(state,action)
                    }
                }
                return state
            }
        }
        function* rootSaga(){
            const {takeEvery}  = sagaEffects 
            for(const model of app._models){
                const effects = model.effects
                for(const key in effects){
                    let type = `${model.namespace}/${key}`
                    yield takeEvery(type,function* (action){
                        try{
                            //onEffect:(effect,{put},model,actionType)=>
                            let effect = effects[key]
                            if(options.onEffect){
                                effect = options.onEffect(effect,sagaEffects,model,action.type)
                            }
                            yield effect(action,sagaEffects)
                        }catch(err){
                            options.onError&&options.onError(err)
                        }
                        
                    })
                }
            }
        }
        let finalReducers=combineReducers(reducers)
        let rootReducers=function(state,action){
            let newState=finalReducers(state,action)
            options.onStateChange&&options.onStateChange(newState)
            return newState
        }
        if(options.onReducer){
            rootReducers=options.onReducer(rootReducers)
        }
        let sagaMiddleware = createSagaMiddleware()
        if(options.onAction){
            if(typeof options.onAction == 'function'){
                options.onAction=[options.onAction]
            }
        }else{
            options.onAction= []
        }
        // if(options.extraEnhancers){
        //     createStore=options.extraEnhancers(createStore)
        // }
        let store = createStore(rootReducers,options.initialState,applyMiddleware(
            sagaMiddleware,routerMiddleware(history),...options.onAction) )
            app._store=store
        sagaMiddleware.run(rootSaga)
        let App = app._router({history})
        ReactDOM.render(<>
            <Provider store = {store} >
                <ConnectedRouter history={history}>
                    {App}
                </ConnectedRouter>
            </Provider>
        </>,document.querySelector(containerId))
    }
    
    return app
}