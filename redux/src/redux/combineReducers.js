export default function (reducers){
    let reducersKeys = Object.keys(reducers)
   return (state={},action)=>{
       let newState={},hasChange=false
        for(let i=0;i<reducersKeys.length;i++){
            let key = reducersKeys[i]
            let preState=state[key]
            let reducer=reducers[key]
            let nextState=reducer(preState,action)
            newState[key]=nextState
            hasChange = hasChange || preState!=newState
        }
    return hasChange?newState:state
   }
}
