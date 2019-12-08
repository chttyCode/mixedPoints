//@ts-ignore
let logger = function({ getState }) {
    return (next: any) => {
        return (actions: object) => {
            console.warn('老状态', getState())
            next(actions)
            console.warn('新状态', getState())
        }
    }
}

export default logger
