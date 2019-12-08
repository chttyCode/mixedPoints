# hooks

## 简介

    -  Hook 是 React 16.8 的新增特性,它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性
    -  使用场景
       -  逻辑重用
       -  纯函数组件需要维护状态
       -  一切皆hook
    - 注意事项
      - 只能在函数最外层调用,不要在循环、条件判断或者子函数中调用。
      - 只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用
    - 解决的问题
      - 在组件之间复用状态逻辑很难，可能要用到render props和高阶组件
      - 复杂组件变得难以理解，Hook 将组件中相互关联的部分拆分成更小的函数
      - 难以理解的 class,包括难以捉摸的this
## API

### Basic Hooks
    - useState
      - 给组件添加state,每次渲染保留这个state
      - 返回值是一个数组,可以解构出一个当前状态和一个更改状态的函数,该函数更改状态时不会合并老状态
      - 参数的初始化是一个惰性的初始化 vs 默认参数的惰性初始化
      - 更新采用的是严格的非深度对比
      - 函数式更新
    - useEffect
      - 在纯函数组件中，任何的副作用都是不被允许的，而useEffect提供了函数式组件的这一能力
      - 合成componentDidMount、componentDidUpdate 和 componentWillUnmount为一体的API
      - 依赖项严格的非深度比较
      - 副作用函数还可以通过返回一个函数来指定如何清除副作用
      - 性能优化
        - 传递第二个参数
        - []会在组件挂载时执行，返回的函数会在卸载时执行
    - useContext
      - context由最近Provider提供数据
      - useContext(MyContext) 相当于 class 组件中的 static contextType = MyContext 或者 <MyContext.Consumer>
### Additional Hooks
    - useReducer
      - useState 的内部实现
      - 接收签名：(state, action) => newState的reducer
      - 在某些场景下，useReducer 会比 useState 更适用，例如 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等
    - useCallback
      - 返回memoized函数，这种优化有助于避免在每次渲染时都进行高开销的计算
    - useMemo
      - 返回memoized值，这种优化有助于避免在每次渲染时都进行高开销的计算
    - useRef
      - 返回一个ref对象，其current属性会在实例挂载的时候赋值
      - 返回的ref对象在整个生命周期内保持不变
      - vs createRef
      - 配合forward使用 
    - useImperativeHandle
      - 可以让你在使用 ref 时自定义暴露给父组件的方案
    - useLayoutEffect
      - 其函数签名与 useEffect 相同，执行时间不同，渲染之前
      - 阻塞视图更新
    - useDebugValue