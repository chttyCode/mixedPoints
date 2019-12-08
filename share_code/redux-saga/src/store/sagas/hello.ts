//helloSaga它只是打印了一条消息，然后退出。
export default function* helloSaga() {
    yield console.warn('Hello Saga!')
}
