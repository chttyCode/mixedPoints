export default function createActions(actions: any) {
  let newActions: any = {};
  for (let type in actions) {
    newActions[type] = function(...args: any[]) {
      return { type, payload: actions[type](...args) };
    };
  }
  return newActions;
}
