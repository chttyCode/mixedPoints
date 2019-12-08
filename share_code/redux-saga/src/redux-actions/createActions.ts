export default function createActions(actions: any) {
    let newActions: any = {}
    for (let type in actions) {
        newActions[type] = function(...args: any[]) {
            let actionType: ReturnType<typeof actions>
            if (typeof (actionType = actions[type](...args)) === 'function') {
                return (...d: any[]) => actionType(...d)
            } else if (typeof actionType === 'object') {
                return actionType
            } else {
                return { type, payload: actionType }
            }
        }
    }
    return newActions
}
