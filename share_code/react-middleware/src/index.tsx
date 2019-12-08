import React from "react";
import ReactDom from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "./redux";
import { Provider, connect } from "./react-redux";
import { thunk, logger } from "./middles";
import * as types from "./types";
import { handleActions, createActions } from "./redux-actions";
interface CounterProps {
  number: number;
  add: (val: number) => any;
  miuns: (val: number) => any;
}
const initState: any = {
  number: 0
};
interface reducercs {
  (
    state: CounterProps,
    action: { tyoe: string; [propsName: string]: any }
  ): any;
}

// const reducer: reducercs = (state = initState, action) => {
//   switch (action.type) {
//     case "ADD":
//       return { number: state.number + (action.payload || 1) };
//     case "MINUS":
//       return { number: state.number - (action.payload || 1) };
//     default:
//       return state;
//   }
// };
//1.处理reducer
// function handleAction(type: string, reducer: any, defaultState: any) {
//   return function(state = defaultState, action: any) {
//     if (action.type === type) {
//       return reducer(state, action);
//     }
//     return state;
//   };
// }
//2.批量处理
// function handleActions(reducers: any, initialState: any) {
//   return function(state = initialState, action: any) {
//     let types = Object.keys(reducers);
//     for (let i = 0; i < types.length; i++) {
//       let type = types[i];
//       if (type === action.type) {
//         return reducers[type](state, action);
//       }
//     }
//     return state;
//   };
// }
const reducers2 = handleActions(
  {
    [types.MINUS]: (state: any, action: any) => {
      return { number: state.number - (action.payload || 1) };
    },
    [types.ADD]: (state: any, action: any) => {
      return { number: state.number + (action.payload || 1) };
    }
  },
  initState
);
const reducers = combineReducers({ counter: reducers2 });

const store = applyMiddleware([thunk, logger])(createStore)(reducers);

//createAction

//1.
// const Minus = {
//   type: types.MINUS,
//   payload: 2
// };

//2.接受参数
// const miuns = function(val: number) {
//   return {
//     type: types.MINUS,
//     payload: val
//   };
// };

// function createAction(type: string, payloadCreator: any) {
//   return function actionCreator(...args: any[]) {
//     return { type, payload: payloadCreator(...args) };
//   };
// }
//3.创建单个action
// const Add = createAction(types.ADD, (val: number) => val * 5);
// const miuns = createAction(types.MINUS, (val: number) => val * 2);

//4.批量创建
// function createActions(actions: any) {
//   let newActions: any = {};
//   for (let type in actions) {
//     newActions[type] = function(...args: any[]) {
//       return { type, payload: actions[type](...args) };
//     };
//   }
//   return newActions;
// }

const actions = createActions({
  [types.ADD]: (payload: number) => payload * 2,
  [types.MINUS]: (payload: number) => payload * 2
});

function Counter(props: CounterProps) {
  return (
    <>
      <p>Hello React-redux-middleware</p>
      <p>{props.number}</p>
      <button onClick={() => props.ADD(5)}>加+</button>
      <br />
      <button onClick={() => props.MINUS(3)}>减-</button>
    </>
  );
}

const CounterCom = connect((state: any) => state.counter, {
  ...actions
})(Counter);

ReactDom.render(
  <Provider store={store}>
    <CounterCom />
  </Provider>,
  document.getElementById("root")
);
