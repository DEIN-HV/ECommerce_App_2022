import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import logger from "redux-logger";
import thunk from "redux-thunk"
import rootReducer from "./root.reducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();
export const middlewares = [logger, sagaMiddleware, thunk];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);

export default store;