# forwardRef

- forwardRef是用来解决HOC组件传递ref的问题的。forwardRef的使用方法如下：

    ```JS
        const TargetComponent = React.forwardRef((props, ref) => (
            <TargetComponent ref={ref} />
        ))
    ```
- 所谓HOC就是Higher Order Component，比如使用redux的时候，我们用connect来给组件绑定需要的state，这其中其实就是给我们的组件在外部包了一层组件，然后通过...props的方式把外部的props传入到实际组件
    ```JS
        /*
            1
        */
        class InputCom extends React.Component {
            render(){
                let {b}=this.props
                console.log(this.props)
                return <input type="text" ref={b} />
            }
        }
        const TargetComponent1 = React.forwardRef((props, ref) =>{
            const MapStateToProps = (state) =>{
                console.log(state,ref)
                return {
                    ...state,
                    b:ref,
                    a:123
                }
            }
            let Com=connect(MapStateToProps,null)(InputCom)
            return <Com />
        })
        /*
            2
        */
        const TargetComponent2 = React.forwardRef((props, ref) =>{
            return class InputCom extends React.Component {
                render(){
                    return <input type="text" ref={b} />
                }
            }
        })
    ```
- 方式1和方式2传递的之处在于ref的传递的方式
    1. 方式1有些投机取巧的行为，为什么这么说呢，因为React将ref和key作为特殊的props单独过滤了，不会作为props传递给子组件，而这里是强行传递ref，方式1还能够实现的另一个原因是因为react提拱了createRef作为新的ref使用方法的原因，如果用string ref就没法当作参数传递了。
    2.  使用forwardRef这个API就必须将组件直接暴露在当前的词法作用域
