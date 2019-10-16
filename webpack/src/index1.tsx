import React from "react";
import ReactDom from "react-dom"


interface Iprops{
    num:number
}
let initState={count:0}

type State=Readonly<typeof initState>
class Counter extends React.Component<Iprops,State>{
    state:State=initState
    handerClick=()=>{
        this.setState({count:this.state.count+1})
    }
    render(){
        return <>
        <p>{this.state.count}</p>
            <button onClick={this.handerClick}> 点我</button>
        </>
    }
}

ReactDom.render(<Counter num={1}>hello</Counter>,document.getElementById('root'))