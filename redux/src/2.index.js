// context
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
// const ThemeContext = React.createContext()//Provider Consumer


function createContext(){
    class Provider extends Component{
        static value;
        constructor(props){
            super(props)
            Provider.value=props.value
            this.state={value:props.value}
        }
        static getDerivedStateFromProps(nextProps,preState){
            Provider.value=nextProps.value
            return {value:nextProps.value}
        }
        render(){
            return this.props.children
        }
    }
    class Consumer extends Component{

        render(){
            return this.props.children(Provider.value)
        }
    }
    return  {
        Provider,
        Consumer
    }
}
const ThemeContext = createContext()//Provider Consumer

class Page extends Component{
    constructor(props){
        super(props)
        this.state={
            color:'red'
        }
    }
    changeColor=(color)=>{
        this.setState({color})
    }
    render(){
        let value={color:this.state.color,changColor:this.changeColor}
        return <ThemeContext.Provider value={value}>
            <div style={{border:`5px solid ${this.state.color}`,padding:5}}>
                Page
                <Header />
                <Main />
            </div>
        </ThemeContext.Provider>
    }
}
class Header extends Component{
    static contextType = ThemeContext
    constructor(props,context){//props属性对象，context上下文对象
        super(props,context)
       
    }
    render(){
        this.context2 = Content.contextType.Provider.value
        return <>
            <div style={{border:`5px solid  ${this.context2.color}`,padding:5}}>
                Header
                <Title />
            </div>
        </>
    }
}
// 组件
// class Title extends Component{
//     static contextType = ThemeContext
//     constructor(props,context){//props属性对象，context上下文对象
//         super(props,context)
//         this.context2 = context || Content.contextType.Provider.value
//     }
//     render(){
//         return <>
//             <div style={{border:`5px solid  ${this.context2.color}`,padding:5}}>
//                 Title
//             </div>
//         </>
//     }
// }
// 函数
function Title(){
    return (
        <ThemeContext.Consumer>
            {value=><div style={{border:`5px solid  ${value.color}`,padding:5}}>Title</div>}
        </ThemeContext.Consumer>
    )
}
class Main extends Component{
    static contextType = ThemeContext
    constructor(props,context){//props属性对象，context上下文对象
        super(props,context)
    }
    render(){
        this.context2 = Content.contextType.Provider.value
        return <>
            <div style={{border:`5px solid  ${this.context2.color}`,padding:5}}>
                Main
                <Content />
            </div>
        </>
    }
}
class Content extends Component{
    static contextType = ThemeContext
    constructor(props,context){//props属性对象，context上下文对象
        super(props,context)
    }
    render(){
        this.context2 = Content.contextType.Provider.value
        return <>
            <div style={{border:`5px solid  ${this.context2.color}`,padding:5}}>
                Content
                <button onClick={()=>this.context2.changColor('red')}>变红</button>
                <button onClick={()=>this.context2.changColor('green')}>变绿</button>
            </div>
        </>
    }
}



ReactDOM.render(<><Page /></>,document.getElementById('root'))
