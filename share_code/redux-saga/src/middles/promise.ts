//@ts-ignore
export default function promise({ dispatch }) {
    return (next: any) => {
        return (actions: any) => {
            if (typeof actions === 'object' && typeof actions.then === 'function') {
                return actions.then(dispatch)
            }
            next(actions)
        }
    }
}
