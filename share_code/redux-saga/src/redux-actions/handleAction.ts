export default function handleAction(type: string, reducer: any, defaultState: any) {
    return function(state = defaultState, action: any) {
        if (action.type === type) {
            return reducer(state, action)
        }
        return state
    }
}
