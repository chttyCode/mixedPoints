function bindActionCreator(actionCreator: any, dispatch: any) {
    return (...args: any) => dispatch(actionCreator.call(null,...args))
}

export default function bindActionCreators(actionCreators:any, dispatch:any) {
    if(typeof actionCreators === 'function'){
        return bindActionCreator(actionCreators,dispatch)
    }
    const boundActionCreators:any = {}
    for (const key in actionCreators) {
        const actionCreator = actionCreators[key]
        if (typeof actionCreator === 'function') {
            boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
        }
    }
    return boundActionCreators
}