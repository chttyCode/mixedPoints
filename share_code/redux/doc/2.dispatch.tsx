let appState:any={
    title: {color: 'red',text: '标题'},
}

function Home(){
    let value = appState.title
    return `<p>${value.color}</p><p>${value.text}</p>`
}

function render(content:any,dom:HTMLElement |null ){
    let Home = content() as any
    (dom as HTMLElement).innerHTML = Home
}
render(Home,document.getElementById('root'))

//通过dispatch的方式修改数据

function dispatch(action) {
    switch (action.type) {
        case 'UPDATE_TITLE_COLOR':
            appState.title.color=action.payload;    
            break;    
        case 'UPDATE_TITLE_TEXT':
            appState.title.text=action.payload;
            break;
        default:
            break;    
    }
}
setTimeout(()=>{
    dispatch({type:'UPDATE_TITLE_COLOR',payload:'purple'});
    console.log(appState)
    render(Home,document.getElementById('root'))
},1000)

//TODO
//1. dispatch 之后需要手动的render
//2. 数据是暴露的