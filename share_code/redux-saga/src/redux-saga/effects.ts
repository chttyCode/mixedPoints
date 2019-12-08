export function take(actionType: string) {
    return {
        type: 'TAKE',
        actionType
    }
}

export function put(action: any) {
    return {
        type: 'PUT',
        action
    }
}
export function fork(task: any) {
    return {
        type: 'FORK',
        task
    }
}
export function call(fn: any, ...args: any[]) {
    return {
        type: 'CALL',
        fn,
        args
    }
}
//delay
export function* takeEvery(actionType: any, task: any) {
    yield fork(function*() {
        while (true) {
            yield take(actionType)
            yield task()
        }
    })
}

export function cps(fn: any, ...args: any[]) {
    return {
        type: 'CPS',
        fn,
        args
    }
}
export function all(fns: any[]) {
    return {
        type: 'ALL',
        fns
    }
}
export function cancel(task: GeneratorFunction) {
    return {
        type: 'CANCEL',
        task
    }
}
