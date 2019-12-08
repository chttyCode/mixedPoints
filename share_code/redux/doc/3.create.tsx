//封装仓库
//1. 封装，但是state需要依赖外部注入
function createStore_1(){
    let state:any
    function getState(){
        return state
    }
    function dispatch(action) {
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
    }
    return {getState,dispatch}
}
//2. 封装 接受reducer 依然需要手动render
function createStore(reducer:any){
    let state:any
    function getState(){
        return state
    }
    function dispatch(action:any) {
        state = reducer(state,action)
    }
    dispatch('@@reducer/init')
    return {getState,dispatch}
}
const initValue:any={
    title: {color: 'red',text: '标题'},
}

function reducer(state:any=initValue,action:any){
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
const store:any = createStore(reducer)

function Home(){
    let {title:value} = store.getState()
    return `<p>color:${value.color}</p><p>text:${value.text}</p>`
}

function render(content:any,dom:HTMLElement |null ){
    let Home = content() as any
    (dom as HTMLElement).innerHTML = Home
}
render(Home,document.getElementById('root'))

setTimeout(()=>{
    store.dispatch({type:'UPDATE_TITLE_COLOR',payload:'green'})
    render(Home,document.getElementById('root'))
},1000)

//3.发布订阅解决手动render


