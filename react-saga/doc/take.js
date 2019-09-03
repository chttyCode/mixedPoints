let observer={}
function take(actionType,listener){
    observer[actionType] = listener
}
take('ADD',()=>{console.log('do')})


function fire(actionType){
    observer[actionType]&&observer[actionType]()
    Reflect.deleteProperty(actionType)
}

fire('ADD')