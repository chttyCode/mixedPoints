import React from 'react'
import {Route} from './index'
export default  (Component)=>{
    return (props)=><Route component={Component}></Route>
}