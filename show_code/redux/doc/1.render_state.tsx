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