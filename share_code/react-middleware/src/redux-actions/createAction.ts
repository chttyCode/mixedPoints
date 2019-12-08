export default function createAction(type: string, payloadCreator: any) {
  return function actionCreator(...args: any[]) {
    return { type, payload: payloadCreator(...args) };
  };
}
