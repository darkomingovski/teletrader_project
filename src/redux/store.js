import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers/App";
import ReduxThunk from "redux-thunk";

export const store = createStore(
  reducers,
  compose(
    applyMiddleware(ReduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true, traceLimit: 25 })
      : (f) => f
  )
);
