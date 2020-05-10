import * as types from "./types";
//v1
// export default {
//   add(number: any) {
//     return { type: types.ADD1 };
//   },
//   minus() {
//     return { type: types.MINUS1 };
//   }
// };

function createAction(type: any, createPayload: any) {
  return function(...args: any) {
    return { type, payload: createPayload(...args) };
  };
}
function createActions(actions: { [x: string]: any }) {
  let actionsCreators: any = {};
  for (let key in actions) {
    actionsCreators[key] = createAction(key, actions[key]);
  }
  return actionsCreators;
}
//v2
// const add = createAction(types.ADD1, (amount: any) => amount * 2);
// export default {
//   add
// };
//v3
// export default createActions({
//   [types.ADD1]: (amount: any) => amount * 2
// });
//v4 重命名action
const actionCreators = createActions({
  [types.ADD1]: (amount: any) => amount * 2
});
const ADD = (params: any) => (dispatch: (arg0: any) => any, getState: any) => {
  return dispatch(actionCreators[types.ADD1](params));
};
export default {
  ADD
};
