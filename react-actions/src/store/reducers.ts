import * as types from "./types";
import actions from "./actions";
let init = {
  number: 0
};
// v1
// export default function(state = init, action: { type: any; payload: any }) {
//   switch (action.type) {
//     case types.ADD1:
//       return { number: state.number + (action.payload || 1) };
//     case types.MINUS1:
//       return { number: state.number - 1 };
//     default:
//       return state;
//   }
// }

function handleAction(
  actionCreator: any,
  reducer: (arg0: any, arg1: any) => void,
  initState: any
) {
  return function(state: any = initState, action: { type: any }) {
    if (action.type === actionCreator().type) {
      return reducer(state, action);
    }
    return state;
  };
}
function handleActions(actions: { [x: string]: any }, initialState: any) {
  return function(state = initialState, action: { type: string | number }) {
    let reducer = actions[action.type];
    if (reducer) {
      return reducer(state, action);
    }
    return state;
  };
}
// v2
// export default handleAction(
//   actions[types.ADD1],
//   (state: any, action: any) => {
//     console.log(state.number);
//     return { number: state.number + 1 };
//   },
//   init
// );
//v3
export default handleActions(
  {
    [types.ADD1]: (state: any, action: any) => {
      console.log(state.number, action);
      return { number: state.number + (action.payload || 1) };
    }
  },
  init
);
