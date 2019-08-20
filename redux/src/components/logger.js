import React ,{Component} from 'react'

let Hello=()=><p>Hello</p>
function WithLogger(WrappedComponent){
    return class WrapComponent extends Component {
        componentWillMount(){
            console.time('wrap')
        }
        componentDidMount(){
            console.timeEnd('wrap')
        }
        render(){
            return <WrappedComponent />
        }
    }
}

export default WithLogger(Hello)