export default function Store (reducer:any,state?:any){
    let listeners:any[]=[];
    function subscribe(listener:any){
        listeners.push(listener)
        return ()=>{
            listeners = listeners.filter((l:any)=>l!==listener)
        }
    }
    function getState(){
        return state
    }
    function dispatch(action:any){
        if(Reflect.getPrototypeOf(action) !== Object.prototype){
            throw new Error('动作必须是纯对象')
        }
        if(typeof action.type === 'undefined'){
            throw new Error('动作类型不能为空')
        }
        state = reducer(state,action)
        listeners.forEach((l:any)=>l())
    }
    dispatch({type:'@@redux/init'})
    return {
        getState,
        subscribe,
        dispatch
    }
}