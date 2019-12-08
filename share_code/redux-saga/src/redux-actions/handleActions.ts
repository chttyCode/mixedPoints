export default function handleActions(reducers: any, initialState: any) {
    return function(state = initialState, action: any) {
        let types = Object.keys(reducers)
        for (let i = 0; i < types.length; i++) {
            let type = types[i]
            if (type === action.type) {
                return reducers[type](state, action)
            }
        }
        return state
    }
}
