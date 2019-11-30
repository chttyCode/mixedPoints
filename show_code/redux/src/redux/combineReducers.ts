export default function combineReducers(reducers:any){
    const reducerKeys = Object.keys(reducers)
    return function combination(state:any = {}, action :any ) {
        const nextState:any = {}
        for (let i = 0; i < reducerKeys.length; i++) {
            const key = reducerKeys[i];
            const reducer = reducers[key];
            const previousStateForKey = state[key];
            const nextStateForKey = reducer(previousStateForKey, action);
            nextState[key] = nextStateForKey;
        }
        return nextState;
    }
}