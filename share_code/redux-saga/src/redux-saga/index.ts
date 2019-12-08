const times: any = (cb: any, times: number) => {
    let count = 0
    return () => {
        if (++count >= times) {
            cb()
        }
    }
}
export default function createSagaMiddleware() {
    function createChannel(): any {
        let listener = {} as any
        function subscribe(actionType: string, cb: any) {
            listener[actionType] = cb
        }
        function publish(action: any) {
            //key 数组 *
            if (listener[action.type]) {
                // listener[action.type]()
                // delete listener[action.type]
                let temp = listener[action.type],
                    temp2 = listener['*']
                delete listener[action.type], listener['*']
                temp(action)
                temp2 && temp2(action)
            }
        }
        return { subscribe, publish }
    }
    let channel = createChannel()

    //@ts-ignore
    function sagaMiddleware({ dispatch }): any {
        function run(generator: any, cb?: any) {
            let it = typeof generator == 'function' ? generator() : generator
            function next(action?: any) {
                let { value: effect, done } = it.next(action)
                if (!done && effect) {
                    //iterator
                    if (typeof effect[Symbol.iterator] === 'function') {
                        run(effect)
                        next()
                    } else if (effect.then) {
                        effect.then(next)
                    } else {
                        switch (effect.type) {
                            case 'TAKE':
                                channel.subscribe(effect.actionType, next)
                                break
                            case 'PUT':
                                dispatch(effect.action)
                                next()
                                break
                            case 'FORK':
                                // eslint-disable-next-line no-case-declarations
                                let newTask = effect.task()
                                run(newTask)
                                next(newTask)
                                break
                            case 'CALL':
                                effect.fn(...effect.args).then(next)
                                break
                            case 'CPS':
                                effect.fn(...effect.args, next)
                                break
                            case 'CANCEL':
                                effect.task.return('cancel')
                                break
                            case 'ALL':
                                // eslint-disable-next-line no-case-declarations
                                let fns: any[] = effect.fns,
                                    done: any = times(next, fns.length)
                                fns.forEach((fn: any) => {
                                    run(fn, done)
                                })
                                break
                            default:
                        }
                    }
                } else {
                    cb && cb()
                }
            }
            next()
        }
        //@ts-ignore
        sagaMiddleware.run = run
        return (next: any) => {
            return (actions: any) => {
                channel.publish(actions)
                next(actions)
            }
        }
    }
    return sagaMiddleware as any
}
