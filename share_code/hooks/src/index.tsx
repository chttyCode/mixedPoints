import React, { lazy, Suspense, useReducer } from 'react'
import ReactDom from 'react-dom'
import UseState from './components/use_state'
import UseReducer from './components/use_reducer'
import UseEffect from './components/use_effect'
import UseContext from './components/use_context'
import NumContext from './components/context'
import UseRef from './components/use_ref_create'
import UseRefForward from './components/use_ref_forward'
import UseImpertaiveHandle from './components/use_imperative_handle'
import UseYayoutEffect from './components/use_layout_effect'
function reducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return { num: state.num + 1 };
        case 'MINUS':
            return { num: state.num - 1 };
        default:
            throw new Error();
    }
}
// class Home extends React.Component<any,any>{
//     state={
//         count:this.props.count,
//         role:''
//     }
//     countChange=(role:any)=>{
//         this.setState({role})
//     }
//     render(){
//         let {role} = this.state,value={num:0}
//         return <NumContext.Provider value={value}>
//             Hello React!
//             <UseState />
//             <UseReducer />
//             {role!='UseEffect'&&<UseEffect />}
//             <button onClick={()=>{this.countChange('UseEffect')}}>Unmount</button>
//         </NumContext.Provider>
//     }
// }

function Home() {
    const [state, dispatch] = useReducer(reducer, { num: 0 });
    return <NumContext.Provider value={{state, dispatch}}>
            <UseContext />
            <UseRef />
            <UseRefForward />
            <UseImpertaiveHandle />
            <UseYayoutEffect />
    </NumContext.Provider>
}

ReactDom.render(<Home />, document.getElementById('root'))                                       