import compose from './compose'
//1.applyMiddleware
// function applyMiddleware(middleware: any) {
//   return (createStore: any) => {
//     return (...args: any[]) => {
//       const store = createStore(...args);
//       store.dispatch = middleware(store)(store.dispatch);
//       return {
//         ...store
//       };
//     };
//   };
// }
//2.组合 applyMiddleware
// function applyMiddleware(middlewares: any) {
//   return (createStore: any) => {
//     return (...args: any[]) => {
//       const store = createStore(...args);
//       let chain = middlewares.map((middleware: any) => middleware(store));
//       store.dispatch = compose(...chain)(store.dispatch);
//       return {
//         ...store
//       };
//     };
//   };
// }
//3.增强组合 applyMiddleware
export default function applyMiddleware(middlewares: any) {
    return (createStore: any) => {
        return (...args: any[]) => {
            const store = createStore(...args)
            let dispatch = store.dispatch
            const middlewareAPI = {
                getState: store.getState,
                dispatch: (action: any) => dispatch(action)
            }
            let chain = middlewares.map((middleware: any) => middleware(middlewareAPI))
            dispatch = compose(...chain)(store.dispatch)
            return {
                ...store,
                dispatch
            }
        }
    }
}
