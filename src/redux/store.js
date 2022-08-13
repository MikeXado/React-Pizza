import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";

const presistedState = localStorage.getItem("cartData")
  ? JSON.parse(localStorage.getItem("cartData"))
  : {};
const store = createStore(rootReducer, presistedState, composeWithDevTools());

export default store;
