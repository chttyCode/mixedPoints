export default function createStore(reducer){//保护变量
    let state,listeners=[];
    function getState(){
        return state
    }
    function dispatch(action){//规定行为
      state=reducer(state,action)
      listeners.forEach(fn=>fn())
    }
    function subScriber(listener){
        listeners.push(listener)
        return()=>{
            listeners=listeners.filter(item=>item!=listener)
        }
    }
    dispatch({type:'@@TYPE/REDUEX_INIT'})
    return {dispatch,getState,subScriber}
}