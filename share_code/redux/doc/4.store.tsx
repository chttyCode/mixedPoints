//3.发布订阅解决手动render
function createStore(reducer:any){
    let state:any
    let listeners:any=[]
    function getState(){
        return state
    }
    function subscribe(listener:any){
        listeners.push(listener)
        return ()=>{
            listeners=listeners.filter((l:any)=>l!==listener)
        }
    }
    function dispatch(action:any) {
        state = reducer(state,action)
        listeners.forEach((l:any) =>l());
    }
    dispatch('@@reducer/init')
    return {getState,dispatch,subscribe}
}
const init:any={
    title: {color: 'red',text: '标题'},
}

function reducer(state:any=init,action:any){
    switch (action.type) {
        case 'UPDATE_TITLE_COLOR':
            state.title.color=action.payload;    
            break;    
        case 'UPDATE_TITLE_TEXT':
            state.title.text=action.payload;
            break;
        default:
            break;    
    }
    return state
}
const store = createStore(reducer)
function Home(){
    let {title:value} = store.getState()
    return `<p>color:${value.color}</p><p>text:${value.text}</p>`
}

function render(){
    (document.getElementById('root') as HTMLElement).innerHTML = Home()
}
render()
store.subscribe(render)
    
setTimeout(()=>{
    store.dispatch({type:'UPDATE_TITLE_COLOR',payload:'green'})
},1000)

setTimeout(()=>{
    store.dispatch({type:'UPDATE_TITLE_COLOR',payload:'yellow'})
},2000)

setTimeout(()=>{
    store.dispatch({type:'UPDATE_TITLE_COLOR',payload:'blue'})
},3000)


