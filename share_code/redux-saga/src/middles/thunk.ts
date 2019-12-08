//3.thunk
//@ts-ignore
let thunk = function({ getState, dispatch }) {
    return (next: any) => {
        return (actions: object) => {
            if (typeof actions === 'function') {
                actions(dispatch, getState)
                return
            }
            next(actions)
        }
    }
}
export default thunk
