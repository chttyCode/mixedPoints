
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
                return (next(action),Reflect.deleteProperty( observer[action.type] ))
            }
        }
        return {
            subscribe,
            pulish
        }
    }
    let channel = createChannel()
    function sagaMiddleWare({getState,dispatch}){
        function run(gen){//执行generator
            console.log('开始执行gen')
            let it = gen()
            function next(action){
                let {value:effect,done} = it.next(action)
                if(!done){
                    switch(effect.type){
                        case 'TAKE':channel.subscribe(effect.actionType,next);break;
                        case 'PUT':dispatch(effect.action);next();break;
                    }
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