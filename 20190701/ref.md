# react 

- ref
    - 新的ref用法，React即将抛弃<div ref="myDiv" />这种string ref的用法，将来你只能使用两种方式来使用ref
    ```JS
        export default class RefDemo extends React.Component {
            constructor() {
                super()
                this.objRef = React.createRef()

                // { current: null }
            }

            componentDidMount() {
                // console.log(`span1: ${this.refs.ref1.textContent}`)
                // console.log(`span2: ${this.ref2.textContent}`)
                // console.log(`span3: ${this.ref3.current.textContent}`)
                setTimeout(() => {
                this.refs.stringRef.textContent = 'string ref got'//即将在17版本取消该方法
                this.methodRef.textContent = 'method ref got'
                this.objRef.current.textContent = 'obj ref got'
                }, 1000)
            }

            render() {
                return (
                <>
                    <p ref="stringRef">span1</p>
                    <p ref={ele => (this.methodRef = ele)}>span3</p>
                    <p ref={this.objRef}>span3</p>
                </>
                )
            }
        }
    ```  
- context
    - createContext是官方定稿的context方案，在这之前我们一直在用的老的context API都是React不推荐的API，现在新的API释出，官方也已经确定在17大版本会把老API去除