import React from 'react'
import {Link, Route,withRoute} from '../react-router-dom'
class Nav extends React.Component{
     render(){
         return (
             <div>
                 <a to= '/' onClick={()=>{
                     this.props.history.push('/')
                 }}>  with-router</a>
             </div>
         )
     }
 }
//  function withRouter(Component){
//      return (props)=><Route component={Component}></Route>
//  }

 export default withRoute(Nav)
 