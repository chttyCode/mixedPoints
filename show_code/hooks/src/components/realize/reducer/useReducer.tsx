import React from 'react'
let memoizedState:any;
function useReducer(reducer:(state:any,action:object)=>object, initParam:any,initFn:(initState:any)=>any){
    var initialState = void 0;
    //memoizedState 所谓的惰性初始化
     if (initFn !== undefined  || !memoizedState ) {
       initialState = initFn(initParam);
     } else {
       initialState = initParam;
     }
     function dispatch(action:object){
         memoizedState = reducer(memoizedState,action);
         //render();
     }
     memoizedState =  memoizedState||initialState;
     return  [memoizedState, dispatch];
}