
export function take(actionType){
    return{
        type:'TAKE',
        actionType
    }
}
export function put(action){
    return {
        type:'PUT',
        action
    }
}
export function fork(task){
    return {
        type:'FORK',
        task
    }
}
export function* takeEvery(actionType,gen){
    yield fork(function* (){
        while(true){
            yield take(actionType)
            yield gen()
        }
    })
}

export function call(fn,...args){
    return {
        type:'CALL',
        fn,
        args
    }
}
function innerDelay(ms){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(ms)
        },ms)
    })
}
export function delay(...args){
    return call(innerDelay,...args)
}

export function cps(fn,...args){
    return {
        type:'CPS',
        fn,
        args
    }
}

export function all(fns){
    return {
        type:'ALL',
        fns
    }
}

export function cancel(task){
    return {
        type:'CANCEL',
        task
    }
}