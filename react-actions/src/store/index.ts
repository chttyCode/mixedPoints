import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
let store = applyMiddleware(thunk)(createStore)(reducers);
// let store = createStore(reducers);

export default store;
