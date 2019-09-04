
export default function createSagaMiddleWare(){
    function createChannel(){
        let observer={}
        window.observer = observer
        function subscribe(actionType,callback){
            observer[actionType] = callback
        }
        function pulish(action){
            let next = observer[action.type]
            if(next){
                return (Reflect.deleteProperty( observer[action.type] ),next(action))
            }
        }
        return {
            subscribe,
            pulish
        }
    }
    let channel = createChannel()
    function sagaMiddleWare({getState,dispatch}){
        function run(gen,callback){//执行generator
            console.log('开始执行gen')
            let it = typeof gen[Symbol.iterator] == 'function'?gen:gen()
            function next(action){
                let {value:effect,done} = it.next(action)
                if(!done){
                    if(typeof effect[Symbol.iterator] == 'function'){
                        run(effect)//
                        next()
                    }else if(typeof effect.then === 'function'){
                        effect.then(next)
                    }else{
                        switch(effect.type){
                            case 'TAKE':channel.subscribe(effect.actionType,next);break;
                            case 'PUT':dispatch(effect.action);next();break;
                            case 'FORK':
                                let newTask=effect.task()   
                                run(newTask);
                                next(newTask);
                                break;
                            case 'CANCEL':
                                effect.task.return('任务结束')
                                break;
                            case 'CALL':
                                effect.fn(...effect.args).then(next)
                                break;
                            case 'CPS':
                                console.log(effect)
                                effect.fn(...effect.args,next)
                                break;
                            case 'ALL':
                                function times(cb,len){
                                    let count = 0;
                                    return ()=>{
                                        count++
                                        if(count == len){
                                            cb&&cb()
                                        }
                                    }
                                }
                                let fns = effect.fns
                                let done = times(next,fns.length)
                                effect.fns.forEach(fn=>run(fn,done));
                                next()
                                break;
                            default:break;
                        }
                    }
                }else{
                    callback&&callback()
                }
            }
            next()
        }
        sagaMiddleWare.run=run
        return function(next){
            return function(action){
                channel.pulish(action)
                next(action)
            }
        }
    }

    
    return sagaMiddleWare
}